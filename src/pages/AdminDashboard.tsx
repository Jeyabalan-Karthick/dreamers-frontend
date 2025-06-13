
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { Lightbulb, LogOut, Eye, Users, FileText, CheckCircle, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Application {
  id: string;
  founderName: string;
  startupName: string;
  email: string;
  phone: string;
  companyType: string;
  teamSize: string;
  incubationCentre: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  ideaDescription: string;
  expectations: string[];
  challenges?: string;
}

const AdminDashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }

    // Simulate fetching applications data
    setTimeout(() => {
      const mockApplications: Application[] = [
        {
          id: "APP001",
          founderName: "John Doe",
          startupName: "TechStart AI",
          email: "john@techstart.com",
          phone: "+91 9876543210",
          companyType: "Technology",
          teamSize: "2-5",
          incubationCentre: "IIT Delhi Incubation Centre",
          status: "pending",
          submittedAt: "2024-01-15",
          ideaDescription: "AI-powered customer service automation platform that helps businesses...",
          expectations: ["Funding Support", "Mentorship and Guidance", "Network Access"],
          challenges: "Finding the right technical talent and initial funding"
        },
        {
          id: "APP002",
          founderName: "Sarah Smith",
          startupName: "EcoSmart Solutions",
          email: "sarah@ecosmart.com",
          phone: "+91 9876543211",
          companyType: "Sustainability",
          teamSize: "6-10",
          incubationCentre: "IIT Bombay Incubation Centre",
          status: "approved",
          submittedAt: "2024-01-10",
          ideaDescription: "Sustainable packaging solutions for e-commerce companies...",
          expectations: ["Technical Resources", "Market Research", "Funding Support"],
          challenges: "Scaling production and meeting regulatory requirements"
        },
        {
          id: "APP003",
          founderName: "Raj Patel",
          startupName: "HealthTech Pro",
          email: "raj@healthtech.com",
          phone: "+91 9876543212",
          companyType: "Healthcare",
          teamSize: "1-5",
          incubationCentre: "T-Hub Hyderabad",
          status: "rejected",
          submittedAt: "2024-01-08",
          ideaDescription: "Telemedicine platform for remote healthcare delivery...",
          expectations: ["Legal Support", "Funding Support", "Network Access"],
          challenges: "Regulatory compliance and user acquisition"
        }
      ];
      setApplications(mockApplications);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate("/");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Dreamers Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Public Site
              </Link>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <XCircle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              All Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Founder</TableHead>
                  <TableHead>Startup Name</TableHead>
                  <TableHead>Incubation Centre</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell className="font-medium">{application.id}</TableCell>
                    <TableCell>{application.founderName}</TableCell>
                    <TableCell>{application.startupName}</TableCell>
                    <TableCell>{application.incubationCentre}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(application.status)}>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(application.status)}
                          <span className="capitalize">{application.status}</span>
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(application.submittedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Application Details - {selectedApplication?.startupName}</DialogTitle>
                          </DialogHeader>
                          {selectedApplication && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-gray-700">Founder Information</h4>
                                  <p><strong>Name:</strong> {selectedApplication.founderName}</p>
                                  <p><strong>Email:</strong> {selectedApplication.email}</p>
                                  <p><strong>Phone:</strong> {selectedApplication.phone}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-700">Company Information</h4>
                                  <p><strong>Startup Name:</strong> {selectedApplication.startupName}</p>
                                  <p><strong>Company Type:</strong> {selectedApplication.companyType}</p>
                                  <p><strong>Team Size:</strong> {selectedApplication.teamSize}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-gray-700">Business Idea</h4>
                                <p className="text-gray-600 mt-1">{selectedApplication.ideaDescription}</p>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-gray-700">Expectations</h4>
                                <ul className="list-disc list-inside text-gray-600 mt-1">
                                  {selectedApplication.expectations.map((exp, index) => (
                                    <li key={index}>{exp}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              {selectedApplication.challenges && (
                                <div>
                                  <h4 className="font-semibold text-gray-700">Current Challenges</h4>
                                  <p className="text-gray-600 mt-1">{selectedApplication.challenges}</p>
                                </div>
                              )}
                              
                              <div className="flex items-center justify-between pt-4 border-t">
                                <div>
                                  <p><strong>Status:</strong> 
                                    <Badge className={`ml-2 ${getStatusColor(selectedApplication.status)}`}>
                                      {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                                    </Badge>
                                  </p>
                                  <p><strong>Submitted:</strong> {new Date(selectedApplication.submittedAt).toLocaleDateString()}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
