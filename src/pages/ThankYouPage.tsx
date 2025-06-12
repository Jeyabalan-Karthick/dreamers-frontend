
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, Lightbulb, Mail, Clock } from "lucide-react";

const ThankYouPage = () => {
  const [applicationData, setApplicationData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("applicationData");
    if (data) {
      setApplicationData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Dreamers
            </h1>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Application Submitted!
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Thank you for submitting your startup application. We're excited to review your innovative idea!
            </p>

            {applicationData && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Summary</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>Startup Name:</strong> {applicationData.startupName}</p>
                  <p><strong>Founder:</strong> {applicationData.founderName}</p>
                  <p><strong>Email:</strong> {applicationData.email}</p>
                  <p><strong>Incubation Centre:</strong> {applicationData.incubationCentre}</p>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">What's Next?</h3>
              </div>
              <p className="text-blue-700 leading-relaxed">
                Your application is pending approval from your selected incubation centre. 
                Our team will review your submission and you'll receive an email notification 
                within 7-10 business days with the next steps.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4">
                <Mail className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800 mb-1">Email Confirmation</h4>
                <p className="text-sm text-green-700">Check your email for confirmation and tracking details</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <Lightbulb className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-800 mb-1">Stay Updated</h4>
                <p className="text-sm text-purple-700">Follow us on social media for startup tips and updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Have questions about your application?
                </p>
                <a 
                  href="mailto:support@dreamers.com" 
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contact our support team
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/apply">
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 w-full sm:w-auto">
                    Submit Another Application
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Application ID: APP-{Date.now().toString().slice(-6)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
