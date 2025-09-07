import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Users, 
  Store, 
  ShoppingBag, 
  TrendingUp, 
  Plus,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Upload,
  DollarSign,
  Clock,
  Star,
  MapPin
} from 'lucide-react';

interface AdminDashboardProps {
  admin: any;
  onLogout: () => void;
}

export function AdminDashboard({ admin, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAddFoodOpen, setIsAddFoodOpen] = useState(false);

  // Mock data
  const [foods, setFoods] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      category: 'Pizza',
      price: '$12.99',
      description: 'Classic pizza with tomato sauce and mozzarella',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      assignedPartners: ['Demo Restaurant', 'Pizza Palace'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Chicken Burger',
      category: 'Burgers',
      price: '$8.99',
      description: 'Grilled chicken breast with lettuce and tomato',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      assignedPartners: ['Demo Restaurant'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Caesar Salad',
      category: 'Salads',
      price: '$7.99',
      description: 'Fresh romaine lettuce with caesar dressing',
      image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400',
      assignedPartners: [],
      status: 'inactive'
    }
  ]);

  const [partners, setPartners] = useState([
    {
      id: '1',
      name: 'Demo Restaurant',
      type: 'restaurant',
      email: 'demo@restaurant.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City',
      status: 'active',
      rating: 4.8,
      totalOrders: 342,
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Pizza Palace',
      type: 'restaurant',
      email: 'info@pizzapalace.com',
      phone: '+1 (555) 234-5678',
      address: '456 Oak Ave, City',
      status: 'pending',
      rating: 0,
      totalOrders: 0,
      joinedDate: '2024-08-10'
    },
    {
      id: '3',
      name: 'Fast Delivery Co',
      type: 'delivery',
      email: 'contact@fastdelivery.com',
      phone: '+1 (555) 345-6789',
      address: '789 Pine St, City',
      status: 'active',
      rating: 4.5,
      totalOrders: 1250,
      joinedDate: '2024-02-20'
    }
  ]);

  const [customers, setCustomers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 111-1111',
      totalOrders: 25,
      totalSpent: '$547.50',
      joinedDate: '2024-03-01',
      status: 'active'
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1 (555) 222-2222',
      totalOrders: 18,
      totalSpent: '$398.75',
      joinedDate: '2024-04-15',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 333-3333',
      totalOrders: 42,
      totalSpent: '$892.30',
      joinedDate: '2024-01-20',
      status: 'active'
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: '#ORD-001',
      customer: 'John Doe',
      partner: 'Demo Restaurant',
      items: 'Margherita Pizza, Caesar Salad',
      amount: '$20.98',
      status: 'delivered',
      date: '2024-08-15',
      time: '12:30 PM'
    },
    {
      id: '#ORD-002',
      customer: 'Sarah Smith',
      partner: 'Pizza Palace',
      items: 'Chicken Burger, Fries',
      amount: '$15.50',
      status: 'preparing',
      date: '2024-08-15',
      time: '1:15 PM'
    },
    {
      id: '#ORD-003',
      customer: 'Mike Johnson',
      partner: 'Demo Restaurant',
      items: 'Caesar Salad',
      amount: '$7.99',
      status: 'pending',
      date: '2024-08-15',
      time: '1:45 PM'
    }
  ]);

  const stats = [
    { title: 'Total Partners', value: partners.length.toString(), icon: Store, change: '+3 this month' },
    { title: 'Total Customers', value: customers.length.toString(), icon: Users, change: '+127 this month' },
    { title: 'Total Orders', value: '1,247', icon: ShoppingBag, change: '+12% from last month' },
    { title: 'Revenue', value: '$47,890', icon: DollarSign, change: '+8% from last month' }
  ];

  const updatePartnerStatus = (partnerId: string, newStatus: string) => {
    setPartners(partners.map(partner => 
      partner.id === partnerId ? { ...partner, status: newStatus } : partner
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddFood = () => {
    // Add food logic here
    setIsAddFoodOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl text-blue-600">Food Service Admin</h1>
              <span className="ml-4 text-gray-600">Welcome, {admin.name}</span>
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
                    <stat.icon className="h-8 w-8 text-blue-600" />
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
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="foods">Food Management</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.customer}</p>
                        </div>
                        <div className="text-right">
                          <p>{order.amount}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Partners</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partners.filter(p => p.status === 'active').map((partner) => (
                      <div key={partner.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-gray-500">{partner.totalOrders} orders</p>
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{partner.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="foods">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Food Management</CardTitle>
                  <CardDescription>
                    Upload, edit, and assign food items to partners
                  </CardDescription>
                </div>
                <Dialog open={isAddFoodOpen} onOpenChange={setIsAddFoodOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Food Item
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Food Item</DialogTitle>
                      <DialogDescription>
                        Upload a new food item to the platform
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="foodName">Food Name</Label>
                        <Input id="foodName" placeholder="Enter food name" />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pizza">Pizza</SelectItem>
                            <SelectItem value="burgers">Burgers</SelectItem>
                            <SelectItem value="salads">Salads</SelectItem>
                            <SelectItem value="desserts">Desserts</SelectItem>
                            <SelectItem value="beverages">Beverages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price">Price</Label>
                        <Input id="price" type="number" placeholder="0.00" step="0.01" />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Enter food description" />
                      </div>
                      <div>
                        <Label htmlFor="image">Food Image</Label>
                        <Input id="image" type="file" accept="image/*" />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsAddFoodOpen(false)}>
                          Cancel
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleAddFood}>
                          Add Food Item
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Assigned Partners</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {foods.map((food) => (
                      <TableRow key={food.id}>
                        <TableCell>
                          <ImageWithFallback
                            src={food.image}
                            alt={food.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            width={48}
                            height={48}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{food.name}</p>
                            <p className="text-sm text-gray-500">{food.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>{food.category}</TableCell>
                        <TableCell>{food.price}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {food.assignedPartners.length > 0 ? (
                              food.assignedPartners.map((partner, index) => (
                                <Badge key={index} variant="secondary">
                                  {partner}
                                </Badge>
                              ))
                            ) : (
                              <span className="text-gray-500">None</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(food.status)}>
                            {food.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Partner Management</CardTitle>
                <CardDescription>
                  Manage restaurant and delivery partners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partners.map((partner) => (
                      <TableRow key={partner.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{partner.name}</p>
                            <p className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" />
                              {partner.address}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">{partner.type}</TableCell>
                        <TableCell>
                          <div>
                            <p>{partner.email}</p>
                            <p className="text-sm text-gray-500">{partner.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            {partner.rating || 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>{partner.totalOrders}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(partner.status)}>
                            {partner.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {partner.status === 'pending' && (
                              <>
                                <Button 
                                  size="sm" 
                                  onClick={() => updatePartnerStatus(partner.id, 'active')}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => updatePartnerStatus(partner.id, 'inactive')}
                                >
                                  <UserX className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>
                  View and manage customer accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-sm text-gray-500">ID: {customer.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{customer.email}</p>
                            <p className="text-sm text-gray-500">{customer.phone}</p>
                          </div>
                        </TableCell>
                        <TableCell>{customer.totalOrders}</TableCell>
                        <TableCell>{customer.totalSpent}</TableCell>
                        <TableCell>{customer.joinedDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(customer.status)}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>
                  View and manage all orders across the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Partner</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date/Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.partner}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>{order.amount}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p>{order.date}</p>
                            <p className="text-sm text-gray-500">{order.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}