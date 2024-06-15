# Outsourcd

Outsourcd is a web application that allows users to search, view, and apply for jobs.
This repo contains the code for the frontend of the application. Built using NextJS, it allows users to view their profile, view job listings, and apply for jobs. Backend code can be found [here](https://github.com/pete-livermore/outsourcd-app).

## Tech

- Next.js
- TypeScript
- TailwindCSS

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/outsourcd-web.git
cd outsourcd
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:<br>
   Create a .env file in the root directory and add the following variables:

```bash
  SERVER_URL=your_backend_server_url
  CLOUDINARY_API_KEY=your_cloudinary_api_key
  CLOUDINARY_API_SECRET=your_cloudinary_api_secret
  CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
  CLOUDINARY_FOLDER_NAME=your_cloudinary_folder_name
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

4. Clone the server repo and run:<br>
   Access the repo and setup guidance [here](https://github.com/pete-livermore/outsourcd-app).

## Running the Application

Start the NestJS server:

```bash
npm run start:dev
# or
yarn start:dev
```

The application will be running on http://localhost:3000

## License

This project is licensed under the MIT License - see the LICENSE file for details.
