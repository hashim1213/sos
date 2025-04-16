#!/bin/bash

# Install dependencies
npm install

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env file from example. Please update with your database credentials."
fi

# Generate Prisma client
npx prisma generate

# Create initial migration
npx prisma migrate dev --name init

echo "Setup complete! Update your .env file with your database credentials and run 'npm run dev' to start the server."
