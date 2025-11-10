#!/usr/bin/env python3
import http.server
import socketserver
import os
from urllib.parse import urlparse

PORT = 5000

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        if path == '/':
            self.path = '/index.html'
        elif not os.path.splitext(path)[1]:
            html_path = path.lstrip('/') + '.html'
            if os.path.exists(html_path):
                self.path = '/' + html_path
        
        return super().do_GET()
    
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format, *args):
        print(f"{self.address_string()} - {format % args}")

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("0.0.0.0", PORT), NoCacheHTTPRequestHandler) as httpd:
    print(f"✨ Serveur démarré sur le port {PORT}")
    print(f"🌐 Accédez au site via l'interface Replit")
    httpd.serve_forever()
