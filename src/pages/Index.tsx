
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react";
import { ArrowRight, CheckCircle, Users, Lightbulb } from "lucide-react";

const Index = () => {
  const qrCodeValue = `${window.location.origin}/apply?ref=event01`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Dreamers
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-600 hover:text-blue-600">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Turn Your
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent block">
                  Startup Dreams
                </span>
                Into Reality
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Join our innovative startup incubation program and get the support, mentorship, 
                and resources you need to build the next big thing.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4 group">
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 hover:bg-gray-50">
                Learn More
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Startups Launched</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">₹50Cr+</div>
                <div className="text-sm text-gray-600">Funding Raised</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="p-8 bg-white/70 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="text-center space-y-6">
                <h3 className="text-2xl font-semibold text-gray-800">Quick Apply</h3>
                <p className="text-gray-600">Scan the QR code to start your application instantly</p>
                <div className="flex justify-center">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <QRCode 
                      value={qrCodeValue} 
                      size={200}
                      fgColor="#1e40af"
                      bgColor="#ffffff"
                      level="M"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Or visit: dreamers.com/apply
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Dreamers?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to transform your innovative ideas into successful businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold">Expert Mentorship</h3>
                <p className="text-gray-600">
                  Get guidance from industry experts and successful entrepreneurs who have been there before.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold">Funding Support</h3>
                <p className="text-gray-600">
                  Access to seed funding, investor networks, and financial planning assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold">Innovation Hub</h3>
                <p className="text-gray-600">
                  State-of-the-art facilities, co-working spaces, and cutting-edge technology resources.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold">Dreamers</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering the next generation of entrepreneurs
            </p>
            <p className="text-sm text-gray-500">
              © 2024 Dreamers Startup Incubation. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
