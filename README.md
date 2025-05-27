# Writing Buddy


## Prerequisites

Before running this project, make sure you have one of the following installed on your machine:

### Option 1: Docker (Recommended)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac)
- [Docker Engine](https://docs.docker.com/engine/install/) (Linux)

### Option 2: Node.js (Traditional Setup)
- [Node.js](https://nodejs.org/) (version 16 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Getting Started

### Method 1: Using Docker (Easiest)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder-name>
   ```

2. **Build the Docker image**
   ```bash
   docker build . -t "writing_buddy:v2.0"

   ```

3. **Run the container**
   ```bash
   docker run -p 5173:5173 writing_buddy:v2.0
   ```

4. **Open your browser**
   Navigate to: `http://localhost:5173`

### Method 2: Using Node.js

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to: `http://localhost:5173`

## Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Docker Commands Reference

### Building and Running
```bash
# Build the image
docker build . -t "writing_buddy:latest"

# Run the container
docker run -p 5173:5173 writing_buddy:latest

# Run in detached mode (background)
docker run -d -p 5173:5173 --name writing_buddy_container writing_buddy:latest
```

### Managing Containers
```bash
# List running containers
docker ps

# Stop a running container
docker stop writing_buddy_container

# Remove a container
docker rm writing_buddy_container

# View container logs
docker logs writing_buddy_container
```

### Managing Images
```bash
# List all images
docker images

# Remove an image
docker rmi writing_buddy:latest

# Clean up unused images
docker image prune
```


## Configuration

The project is configured to run on port 5173. If you need to change this:

1. **For Docker**: Update the port mapping in your docker run command
   ```bash
   docker run -p 3000:5173 writing_buddy:latest
   ```

2. **For Node.js**: Update `vite.config.js`
   ```javascript
   export default defineConfig({
     server: {
       port: 3000
     }
   })
   ```

## Troubleshooting

### Docker Issues

**ERR_EMPTY_RESPONSE or connection refused:**
- Make sure the container is running: `docker ps`
- Check container logs: `docker logs container-name`
- Verify port mapping in your docker run command

**Container won't start:**
- Check if port 5173 is already in use
- Try using a different port: `docker run -p 3000:5173 writing_buddy:latest`

### Node.js Issues

**Module not found errors:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Port already in use:**
- Kill the process using the port or use a different port
- On Windows: `netstat -ano | findstr :5173`
- On Mac/Linux: `lsof -ti:5173 | xargs kill -9`

## Development

To contribute to this project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test with Docker: `docker build . -t writing_buddy:test && docker run -p 5173:5173 writing_buddy:test`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## Environment Variables

If your project uses environment variables, create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
VITE_APP_NAME=Writing Buddy
```

For Docker, you can pass environment variables:
```bash
docker run -p 5173:5173 -e VITE_API_URL=your_api_url writing_buddy:latest
```


## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Look at existing issues in the repository
3. Create a new issue with details about your problem

---

**Happy coding! 🚀**