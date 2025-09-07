import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Shield, User, Lock } from 'lucide-react';

interface AdminAuthFormProps {
  onLogin: (admin: any) => void;
}

export function AdminAuthForm({ onLogin }: AdminAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockAdmin = {
        id: '1',
        name: 'Admin User',
        email: 'admin@foodservice.com',
        role: 'super_admin',
        permissions: ['manage_partners', 'manage_food', 'manage_customers', 'view_analytics']
      };
      onLogin(mockAdmin);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-blue-600">Food Service Admin</CardTitle>
          <CardDescription>
            Administrative portal for platform management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Email
              </Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Enter admin email" 
                defaultValue="admin@foodservice.com"
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter admin password" 
                defaultValue="admin123"
                required 
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In to Admin Portal'}
            </Button>
          </form>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              Demo credentials are pre-filled. Click "Sign In" to continue.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}