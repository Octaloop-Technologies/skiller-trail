# API Integration Guide

## Backend Endpoint Requirements

Your backend needs to provide an endpoint for trial signup:

### Endpoint: Start Trial

```
POST /trial/start
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "full_name": "John Doe"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Trial started successfully",
  "data": {
    "user_id": "12345",
    "trial_end_date": "2026-03-14T00:00:00Z",
    "email": "user@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists",
  "error": "DUPLICATE_EMAIL"
}
```

---

## Frontend Integration

### Step 1: Update the API Call

Open `/src/components/TrialSignup.tsx` and replace the `handleStartTrial` function:

```tsx
const handleStartTrial = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!email || !fullName) {
    alert('Please fill in all fields');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  setIsSubmitting(true);
  
  try {
    const response = await fetch(`${API_URL}/trial/start`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        full_name: fullName,
      }),
    });

    const data = await response.json();
    
    if (response.ok && data.success) {
      // Success! Store trial info and redirect
      localStorage.setItem('trial_user', JSON.stringify(data.data));
      window.location.href = '/trial-success';
    } else {
      // Show error message from backend
      alert(data.message || 'Failed to start trial');
    }
  } catch (error) {
    console.error('Trial signup error:', error);
    alert('Something went wrong. Please try again later.');
  } finally {
    setIsSubmitting(false);
  }
};
```

### Step 2: Install Toast Notifications (Optional but Recommended)

```bash
cd /Users/wasaamqazi/Movies/web/skiller-trial
npm install react-toastify
```

Update `app/layout.tsx`:
```tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          theme="dark"
        />
      </body>
    </html>
  );
}
```

Then in `TrialSignup.tsx`:
```tsx
import { toast } from 'react-toastify';

// Replace alert() calls with toast:
toast.error('Please fill in all fields');
toast.error('Please enter a valid email address');
toast.success('Trial started successfully!');
toast.error(data.message || 'Failed to start trial');
```

### Step 3: Create Success Page

Create `/app/trial-success/page.tsx`:

```tsx
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrialSuccess() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get trial user data from localStorage
    const storedUser = localStorage.getItem('trial_user');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    } else {
      // No trial data found, redirect to signup
      router.push('/');
    }
  }, [router]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#4F5BD5] to-[#2B35A0] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4F5BD5] via-[#3D47B8] to-[#2B35A0] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Welcome Message */}
          <div className="space-y-2">
            <h1 className="text-white text-3xl font-bold">
              Welcome to SKILLER!
            </h1>
            <p className="text-white/90 text-lg">
              Your 60-day free trial has started
            </p>
          </div>

          {/* Trial Info */}
          <div className="bg-white/5 rounded-xl p-4 space-y-2">
            <p className="text-white/80 text-sm">
              <span className="font-semibold">Email:</span> {userData.email}
            </p>
            <p className="text-white/80 text-sm">
              <span className="font-semibold">Trial ends:</span>{' '}
              {new Date(userData.trial_end_date).toLocaleDateString()}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="w-full py-4 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold transition-all"
            >
              Get Started
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
            >
              Back to Home
            </button>
          </div>

          {/* Additional Info */}
          <p className="text-white/70 text-xs">
            Check your email for next steps and getting started guide.
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

## Testing the Integration

### 1. Test with Mock Data

In `TrialSignup.tsx`, temporarily use mock data:

```tsx
// For testing only - remove after
const mockApiCall = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        json: async () => ({
          success: true,
          message: "Trial started successfully",
          data: {
            user_id: "test123",
            trial_end_date: "2026-03-14T00:00:00Z",
            email: email,
          }
        })
      });
    }, 1000);
  });
};

const response: any = await mockApiCall();
```

### 2. Test Error Cases

```tsx
// Test duplicate email
// Test invalid email format
// Test network error
// Test timeout
```

### 3. Test Success Flow

1. Fill in form with valid data
2. Click "Start trial"
3. Should show loading state
4. Should redirect to success page
5. Success page should show user data

---

## Additional Features to Consider

### 1. Email Verification

After signup, send verification email:

```tsx
// In success page
<p className="text-white/90">
  We've sent a verification link to {userData.email}
</p>
```

### 2. Analytics Tracking

```tsx
// Track trial signups
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'trial_signup', {
    email: email,
    method: 'web',
  });
}
```

### 3. Rate Limiting

Add client-side rate limiting:

```tsx
const [lastSubmit, setLastSubmit] = useState(0);

const handleStartTrial = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Rate limit: only allow one submit per 5 seconds
  const now = Date.now();
  if (now - lastSubmit < 5000) {
    toast.error('Please wait a moment before trying again');
    return;
  }
  setLastSubmit(now);
  
  // Continue with form submission...
};
```

### 4. Capture UTM Parameters

Track marketing campaigns:

```tsx
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const utm_source = params.get('utm_source');
  const utm_campaign = params.get('utm_campaign');
  
  // Store for later use in API call
  if (utm_source) {
    localStorage.setItem('utm_source', utm_source);
  }
}, []);
```

---

## Environment Variables

Update your `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://skiller-back-py.octaloop.dev

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Feature Flags
NEXT_PUBLIC_ENABLE_TRIAL=true
```

Update `src/config.tsx`:

```tsx
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://skiller-back-py.octaloop.dev"
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID
export const TRIAL_ENABLED = process.env.NEXT_PUBLIC_ENABLE_TRIAL === 'true'
```

---

## Security Considerations

1. **HTTPS Only**: Ensure your API uses HTTPS
2. **CORS**: Configure CORS on your backend to allow your frontend domain
3. **Rate Limiting**: Implement server-side rate limiting
4. **Input Validation**: Validate on both client and server
5. **SQL Injection**: Use parameterized queries
6. **XSS Protection**: Sanitize user inputs

---

**Ready to integrate?** Follow the steps above and update the TODO section in `TrialSignup.tsx`!
