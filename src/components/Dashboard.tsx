import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  DollarSign,
  Users,
  Star
} from 'lucide-react';

interface DashboardProps {
  partner: any;
  onLogout: () => void;
}

export function Dashboard({ partner, onLogout }: DashboardProps) {
  const [orders, setOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'John Doe',
      items: 'Burger Combo, Fries',
      amount: '$24.99',
      status: 'pending',
      time: '2 mins ago',
      address: '123 Main St'
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Smith',
      items: 'Pizza Margherita, Coke',
      amount: '$18.50',
      status: 'preparing',
      time: '5 mins ago',
      address: '456 Oak Ave'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      items: 'Chicken Salad',
      amount: '$12.99',
      status: 'ready',
      time: '8 mins ago',
      address: '789 Pine St'
    },
    {
      id: '#ORD-004',
      customer: 'Emma Wilson',
      items: 'Pasta Alfredo, Garlic Bread',
      amount: '$22.00',
      status: 'delivered',
      time: '1 hour ago',
      address: '321 Elm St'
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = [
    { title: 'Today\'s Orders', value: '28', icon: ShoppingBag, change: '+12%' },
    { title: 'Revenue', value: '$1,247', icon: DollarSign, change: '+8%' },
    { title: 'Avg. Prep Time', value: '18 min', icon: Clock, change: '-3 min' },
    { title: 'Rating', value: '4.8', icon: Star, change: '+0.2' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl text-orange-600">FoodPartner</h1>
              <span className="ml-4 text-gray-600">Welcome back, {partner.name}</span>
            </div>
            <Button variant="outline" onClick={onLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  Manage incoming orders and update their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p>{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.address}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{order.time}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {order.status === 'pending' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'preparing')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Accept
                              </Button>
                            )}
                            {order.status === 'preparing' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'ready')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Ready
                              </Button>
                            )}
                            {order.status === 'ready' && (
                              <Button 
                                size="sm" 
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                className="bg-gray-600 hover:bg-gray-700"
                              >
                                Delivered
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>This Week</span>
                      <span className="text-green-600">$3,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>This Month</span>
                      <span className="text-green-600">$12,890</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Orders</span>
                      <span>342</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Order Value</span>
                      <span>$18.50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Order Acceptance Rate</span>
                      <span className="text-green-600">96%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>On-time Delivery</span>
                      <span className="text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Customer Rating</span>
                      <span>4.8/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Response Time</span>
                      <span>2.3 min</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Partner Profile</CardTitle>
                <CardDescription>
                  Manage your business information and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="mb-4">Business Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600">Business Name</label>
                        <p>{partner.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Partner Type</label>
                        <p className="capitalize">{partner.type}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Status</label>
                        <Badge className={partner.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {partner.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600">Email</label>
                        <p>{partner.email}</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Phone</label>
                        <p>+1 (555) 123-4567</p>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600">Address</label>
                        <p>123 Business Street, City, State 12345</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}