# Dockerfile.cpp
FROM gcc:latest

# Install CMake
RUN apt-get update && apt-get install -y cmake

WORKDIR /app

# Copy source code
COPY cpp_engine/ ./cpp_engine/
COPY scripts/ ./scripts/
COPY database/ ./database/ 
# (We copy database folder just in case your C++ reads seed-data.sql)

# Make scripts executable
RUN chmod +x scripts/*.sh

# Create data directory for shared CSV output
RUN mkdir -p data

# Build the C++ Engine
WORKDIR /app/cpp_engine
RUN mkdir -p build && cd build && cmake .. && make

WORKDIR /app

# Run the engine (loop every hour to simulate 'Nightly Batch')
CMD ["/bin/bash", "-c", "while true; do ./scripts/run_cpp_engine.sh; echo 'Sleeping for 1 hour...'; sleep 3600; done"]