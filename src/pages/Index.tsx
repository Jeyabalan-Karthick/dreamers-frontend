
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { ArrowRight, CheckCircle, Users, Lightbulb, Shield } from "lucide-react";

const Index = () => {
  const qrCodeValue = `${window.location.origin}/apply`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Dreamers
              </h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link to="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sign Up
              </Link>
              <Link to="/admin/login" className="text-gray-600 hover:text-gray-900 transition-colors flex items-center">
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Link>
              <Link to="/apply">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                  Apply Now
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Turn Your 
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {" "}Dreams{" "}
            </span>
            Into Reality
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the most innovative startup inc  ubation program. Get mentorship, funding, 
            and resources to build the next big thing. Your entrepreneurial journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-4">
                Start Your Application
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Dreamers?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide everything you need to transform your startup idea into a successful business
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0">
              <CardContent>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Expert Mentorship</h4>
                <p className="text-gray-600">Get guidance from industry veterans and successful entrepreneurs who've been there before.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0">
              <CardContent>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Funding Support</h4>
                <p className="text-gray-600">Access to investor networks and funding opportunities to fuel your startup's growth.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border-0">
              <CardContent>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-4">Innovation Hub</h4>
                <p className="text-gray-600">State-of-the-art facilities and resources to help you build and test your products.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Quick Apply</h3>
            <p className="text-gray-600 mb-8">Scan the QR code to start your application instantly</p>
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-md">
                <QRCodeSVG 
                  value={qrCodeValue} 
                  size={200}
                  fgColor="#1e40af"
                  bgColor="#ffffff"
                />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Or visit: {window.location.origin}/apply
            </p>
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
              <h2 className="text-2xl font-bold">Dreamers</h2>
            </div>
            <p className="text-gray-400 mb-6">Empowering the next generation of entrepreneurs</p>
            <div className="flex justify-center space-x-6">
              <Link to="/apply" className="text-gray-400 hover:text-white transition-colors">
                Apply
              </Link>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/admin/login" className="text-gray-400 hover:text-white transition-colors">
                Admin Portal
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 text-sm">
                © 2024 Dreamers Incubation Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
