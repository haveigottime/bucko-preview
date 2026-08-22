# Local preview only: serves the site with clean URLs (/live -> live.html). Not needed in production.
import http.server, os, sys
class H(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        p = super().translate_path(path)
        if not os.path.exists(p) and os.path.exists(p + ".html"): return p + ".html"
        return p
    def log_message(self, *a): pass
http.server.ThreadingHTTPServer(("127.0.0.1", int(os.environ.get("PORT", sys.argv[1] if len(sys.argv) > 1 else 8765))), H).serve_forever()
