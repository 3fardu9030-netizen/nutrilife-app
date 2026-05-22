import http.server
import socketserver
import json
import os
import urllib.parse
import sys

PORT = 8000
DB_FILE = 'db.json'

DEFAULT_DB = {
    "users": [
        {
            "id": "demo-user",
            "name": "Alex Mercer",
            "email": "alex@nutrilife.com",
            "role": "user",
            "streak": 5,
            "xp": 450,
            "weight": 70,
            "height": 175,
            "age": 28,
            "gender": "Male",
            "goal": "Weight Maintenance",
            "lifestyle": "Moderately Active",
            "allergies": [],
            "conditions": []
        }
    ],
    "habitLogs": [
        {
            "date": "2026-05-20",
            "water": 6,
            "calories": 1950,
            "sleep": 7.5,
            "exercise": 30
        },
        {
            "date": "2026-05-21",
            "water": 8,
            "calories": 2100,
            "sleep": 8.0,
            "exercise": 45
        },
        {
            "date": "2026-05-22",
            "water": 5,
            "calories": 1600,
            "sleep": 6.8,
            "exercise": 20
        }
    ],
    "customFoods": [],
    "blogs": [],
    "comments": [
        {
            "id": 1,
            "articleId": 1,
            "author": "Sarah Connor",
            "text": "This guide is incredibly clear! Implementing the overnight oats recipe tomorrow morning.",
            "date": "2026-05-21"
        }
    ],
    "healthAlerts": []
}

def load_db():
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, 'w') as f:
            json.dump(DEFAULT_DB, f, indent=2)
        return DEFAULT_DB
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except Exception:
        return DEFAULT_DB

def save_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=2)

class NutriLifeHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Prevent caching for development simplicity
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def translate_path(self, path):
        # Override to ensure static files are loaded correctly
        translated = super().translate_path(path)
        return translated

    def get_mime_type(self, path):
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        elif path.endswith('.css'):
            return 'text/css; charset=utf-8'
        elif path.endswith('.html'):
            return 'text/html; charset=utf-8'
        elif path.endswith('.json'):
            return 'application/json; charset=utf-8'
        return None

    def send_response_only(self, code, message=None):
        super().send_response_only(code, message)

    def do_GET(self):
        # Handle API calls
        parsed_url = urllib.parse.urlparse(self.path)
        if parsed_url.path == '/api/db':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            db_data = load_db()
            self.wfile.write(json.dumps(db_data).encode('utf-8'))
            return
        
        # Default file serving (forces JS/CSS MIME type correctness on Windows)
        mime = self.get_mime_type(parsed_url.path)
        if mime:
            # Let the default server handle path translation, but override content type header
            path = self.translate_path(parsed_url.path)
            if os.path.exists(path) and not os.path.isdir(path):
                self.send_response(200)
                self.send_header('Content-type', mime)
                # Read file content length
                stat = os.stat(path)
                self.send_header('Content-Length', str(stat.st_size))
                self.end_headers()
                with open(path, 'rb') as f:
                    self.wfile.write(f.read())
                return
        
        super().do_GET()

    def do_POST(self):
        parsed_url = urllib.parse.urlparse(self.path)
        
        # Read request body
        content_length = int(self.headers.get('Content-Length', 0))
        post_data = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else ""
        
        if parsed_url.path == '/api/save':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            try:
                new_data = json.loads(post_data)
                db = load_db()
                
                # Merge incoming data keys
                for key in new_data:
                    if key in db:
                        db[key] = new_data[key]
                
                save_db(db)
                self.wfile.write(json.dumps({"status": "success", "message": "Database synchronized successfully"}).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
            return
            
        elif parsed_url.path == '/api/chat':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            try:
                req_json = json.loads(post_data)
                user_msg = req_json.get('message', '').lower()
                
                # Smart AI Response Engine
                ai_reply = "I'm your NutriLife AI Assistant. I can help with recipes, calorie tracking, hydration schedules, and healthy meal planners! Could you tell me more about your fitness goals?"
                
                if "hello" in user_msg or "hi " in user_msg or "hey" in user_msg:
                    ai_reply = "Hello! I am your personalized NutriLife AI wellness assistant. How can I help support your healthy lifestyle today?"
                elif "water" in user_msg or "hydrate" in user_msg or "drinking" in user_msg:
                    ai_reply = "Hydration is key to high metabolism and focus! An active adult should aim for 8-10 glasses (2.5 - 3 Liters) daily. Pro tip: Drink a glass of warm water right when you wake up to kickstart digestion!"
                elif "calorie" in user_msg or "weight" in user_msg or "burn" in user_msg:
                    ai_reply = "Weight management depends on energy balance. To lose weight safely, aim for a modest calorie deficit (300-500 kcal below maintenance) while maintaining a protein intake of 1.6g-2.0g per kg of bodyweight."
                elif "breakfast" in user_msg or "morning" in user_msg:
                    ai_reply = "A premium breakfast balances protein, complex carbs, and healthy fats. Excellent startup options: 1. Overnight oats with chia seeds, blueberries, and almond milk. 2. Scrambled eggs on sourdough toast with avocado slices."
                elif "junk food" in user_msg or "sugar" in user_msg or "craving" in user_msg:
                    ai_reply = "Sugar and junk food trigger rapid insulin spikes followed by an energy crash. If you have sweet cravings, try consuming Greek yogurt with dark chocolate chips (70%+ cacao) or a handful of almonds and dates."
                elif "diabetes" in user_msg or "sugar level" in user_msg:
                    ai_reply = "For managing blood glucose levels, focus on complex carbohydrates with a Low Glycemic Index (GI) like oats, barley, quinoa, and non-starchy vegetables. Pair them with healthy fats and lean proteins to slow down sugar absorption."
                elif "protein" in user_msg or "muscle" in user_msg:
                    ai_reply = "Premium protein sources include lean chicken breast, organic eggs, tofu, Greek yogurt, and legumes (lentils, chickpeas). A balanced diet should spread protein intake across 3-4 meals for optimal muscle recovery!"
                elif "recipe" in user_msg or "cook" in user_msg:
                    ai_reply = "Here is a quick premium recipe: **Quinoa Buddha Bowl**. Cook 1 cup quinoa. Top with roasted sweet potato cubes, steamed broccoli, canned chickpeas, avocado slices, and a delicious lemon-tahini dressing (tahini, lemon juice, warm water, garlic)."
                
                response_payload = {
                    "reply": ai_reply,
                    "model": "NutriLife AI Engine (Gemini-Optimized)",
                    "timestamp": "2026-05-22T12:22:00Z"
                }
                self.wfile.write(json.dumps(response_payload).encode('utf-8'))
            except Exception as e:
                self.wfile.write(json.dumps({"reply": "Apologies, I encountered a brief digest issue. Let's try that again!", "error": str(e)}).encode('utf-8'))
            return
            
        self.send_error(404, "Endpoint not found")

if __name__ == '__main__':
    # Initialize DB
    load_db()
    
    # Configure and launch server
    handler = NutriLifeHandler
    print(f"NutriLife Backend initializing...")
    print(f"Loading local database storage...")
    print(f"Serving files from current working directory...")
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"--------------------------------------------------")
        print(f"NutriLife Web Application successfully started!")
        print(f"Local Server URL: http://localhost:{PORT}")
        print(f"Press CTRL+C to terminate the server gracefully.")
        print(f"--------------------------------------------------")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down NutriLife Server. Stay healthy!")
            sys.exit(0)
