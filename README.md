# Community Website Project


A comprehensive community platform designed to connect and serve community members through seamless membership management, event coordination, and real-time announcements. Built with modern technologies to deliver an exceptional user experience and secure access control.

## Features

### Authentication & Authorization
- **Multi-factor Authentication**: Email OTP and mobile number OTP verification
- **Role-based Access Control**: Separate login flows for users and administrators
- **Session Management**: Secure session-based authentication using Supabase
- **Phone Verification**: Advanced phone number validation and verification
### User Management
- **User Registration**: Seamless onboarding with email/phone verification
- **Admin Dashboard**: Comprehensive administrative control panel
- **Profile Management**: User profile customization and settings

### Platform Features
- **Multi-language Support**: Website available in English/Kannada/Hindi languages with Google Translate integration
- **Event Management**: Create, edit, and manage events (Admin only)
- **Announcements**: System-wide announcements 
- **Real-time Updates**: Live data synchronization across sessions
- **Responsive Design**: Mobile-first responsive user interface

## Tech Stack

### Backend
- **Database**: Supabase (Hosted PostgreSQL) - Cloud-hosted database with real-time features
- **Authentication**: Supabase Auth - Modern authentication and session management
- **Verification Services**: Twilio Verify API - Phone number verification and OTP delivery

### Frontend
- **Framework**: Next.js 15.1.0 - React-based full-stack framework
- **UI Library**: React 18.3.1 with TypeScript 5
- **Styling**: Tailwind CSS 3.4.17 - Utility-first CSS framework
- **Components**: Radix UI - Accessible component primitives
- **Animations**: Framer Motion - Advanced motion graphics
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React - Consistent icon library

## Prerequisites

Before running this project, make sure you have the following:

- Node.js (v14 or higher)
- npm or yarn
- [Supabase](https://supabase.com) account (free tier available)
- [Twilio](https://www.twilio.com/en-us) account with Verify API enabled
- [Razorpay](https://dashboard.razorpay.com) account to manage donation
- Google Cloud account with Translate API enabled
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Akki2005/Website.git
   cd Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
  
   ```

3. **Environment Setup**
   
   Create a `.env.local` file in the root directory and add the following variables:
   ```env
   # Supabase Configuration
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Twilio Configuration
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   TWILIO_VERIFY_SERVICE_SID=your_twilio_verify_service_sid

   # Razor pay Configuration
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secrete
   NEXT_PUBLIC_SITE_URL=your_website
     ```

4. **Supabase Setup**
   
   - Create a new project on [Supabase](https://supabase.com)
   - Copy your project URL and API keys to the `.env.local` file
   - Set up your database tables using Supabase Dashboard or SQL Editor
   - Configure authentication providers in Supabase Auth settings

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
     ```

The application will be available at `http://localhost:3000`

##  Authentication Flow

### User Authentication
1. User enters email address or phone number
2. System initiates verification via Twilio Verify API
3. Member receives and enters OTP for verification
4. Session created and managed by Supabase with appropriate permissions

### Admin Authentication
1. Admin enters credentials (username/password)
2. System validates credentials against Supabase database
3. Admin session created with elevated privileges
4. Access to administrative features and member management enabled

## API Endpoints

### Authentication
- `POST /login/user` - User login with email/phone
- `POST /api/auth/verify-otp` - OTP verification
- `POST /login/admin` - Admin authentication
  

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (Admin only)

### Events & Announcements
- `GET /api/events` - Get all events
- `POST /api/admin/events` - Create event (Admin only)
- `PUT /api/admin/events/:id` - Update event (Admin only)
- `DELETE /api/admin/events/:id` - Delete event (Admin only)
- `GET /api/announcements` - Get announcements
- `POST /api/admin/announcements` - Create announcement (Admin only)


## Database Schema

The database is hosted on Supabase and includes the following main tables:

### Members Table (via Supabase Auth)
- `id` - Primary key (UUID)
- `email_id` - Member email address
- `phone_no` - Member phone number
- `profession` - Member profession
- `address` - Member address
- `created_at` - Account creation timestamp
- `documents` - Memeber's documents for proof

### Custom Tables
- **Admins** - Admin information
- **Events** - Event management data
- **Announcements** - Community announcements
- **Donors** - Donors list
- **Footprints** - Community footprints



*Note: Tables are managed through Supabase Dashboard or SQL Editor*

