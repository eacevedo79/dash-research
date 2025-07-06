
.PHONY: install start build nvm

nvm:
	@echo "Switching to correct node version..."
	@. ~/.nvm/nvm.sh && nvm use

install:
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install

start:
	@echo "Starting development server..."
	@cd frontend && npm start

build:
	@echo "Building for production..."
	@cd frontend && npm run build

docker-build:
	@echo "Building Docker image..."
	@docker build -t coral-dashboard .

docker-run:
	@echo "Running Docker container..."
	@docker run -p 8080:80 coral-dashboard
