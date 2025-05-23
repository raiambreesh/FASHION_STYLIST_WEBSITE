import React, { useState, useEffect } from 'react';
import { User, Package, Heart, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem('profile');
    return storedProfile ? JSON.parse(storedProfile) : {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 98765 43210',
    };
  });

  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem('profileImage');
  });

  // Save profile, login status, and image to localStorage when they change
  useEffect(() => {
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (profileImage) {
      localStorage.setItem('profileImage', profileImage);
    }
  }, [profileImage]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Login successful');
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Registration successful');
    setProfile({
      name: registerForm.name,
      email: registerForm.email,
      phone: '',
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    toast.info('Logged out successfully');
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // Optionally clear profile data:
    // localStorage.removeItem('profile');
    // localStorage.removeItem('profileImage');
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="page-transition-container">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-medium mb-6 text-center">Account</h1>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="John Doe"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Register
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition-container">
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium text-center mb-6">My Account</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Manage your profile, track orders, and view your favorites.
          </p>
        </div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="bg-gray-50 p-6 rounded">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden mb-3">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="h-10 w-10 text-gray-500 m-auto" />
                  )}
                </div>
                <h2 className="font-medium">{profile.name}</h2>
                <p className="text-gray-500 text-sm">{profile.email}</p>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-3 text-sm" />
              </div>
              <nav className="space-y-1">
                <a href="#profile" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-black">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </a>
                <a href="#orders" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-black">
                  <Package className="h-5 w-5" />
                  <span>Orders</span>
                </a>
                <a href="#favorites" className="flex items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-black">
                  <Heart className="h-5 w-5" />
                  <span>Favorites</span>
                </a>
                <button
                  className="flex w-full items-center gap-3 p-3 rounded-md hover:bg-gray-100 text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white p-6 border rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-6" id="profile">Profile Information</h2>
              <form className="space-y-4 max-w-md" onSubmit={handleSaveProfile}>
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Full Name</Label>
                  <Input
                    id="profile-name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-phone">Phone</Label>
                  <Input
                    id="profile-phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="pt-4">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;