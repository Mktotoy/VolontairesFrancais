#!/bin/bash
# Development server launcher for Volontaires français

echo "🚀 Démarrage de Volontaires français (Développement)"
echo ""

# Check if both directories exist
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Erreur : Les dossiers 'frontend' et 'backend' sont requis"
    exit 1
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "⏹️  Arrêt des serveurs..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT SIGTERM

# Start backend
echo "📦 Démarrage du backend Directus (port 8055)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 3

# Start frontend
echo "🎨 Démarrage du frontend Next.js (port 5000)..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Serveurs démarrés!"
echo "   Frontend  : http://localhost:5000"
echo "   Backend   : http://0.0.0.0:8055"
echo "   Admin     : http://0.0.0.0:8055/admin"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter"
echo ""

# Wait for all background jobs
wait
