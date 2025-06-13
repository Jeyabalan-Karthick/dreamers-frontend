import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { Lightbulb, ArrowLeft, ArrowRight, Upload, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SupportForm from "@/components/SupportForm";

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const [showSupportForm, setShowSupportForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Step 1
    founderName: "",
    startupName: "",
    email: "",
    phone: "",
    companyType: "",
    teamSize: "",
    couponCode: "",
    
    // Step 2
    incubationCentre: "",
    registrationCertificate: null as File | null,
    incubationLetter: null as File | null,
    websiteLink: "",
    
    // Step 3
    ideaDescription: "",
    expectations: [] as string[],
    challenges: ""
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setFormData(prev => ({
      ...prev,
      founderName: parsedUser.name || "",
      email: parsedUser.email || "",
      phone: parsedUser.contact || ""
    }));
  }, [navigate]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleExpectationChange = (expectation: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      expectations: checked 
        ? [...prev.expectations, expectation]
        : prev.expectations.filter(e => e !== expectation)
    }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.founderName && formData.startupName && formData.email && 
               formData.phone && formData.companyType && formData.teamSize;
      case 2:
        return formData.incubationCentre && formData.registrationCertificate;
      case 3:
        return formData.ideaDescription && formData.expectations.length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(3)) {
      localStorage.setItem("applicationData", JSON.stringify(formData));
      toast({
        title: "Success",
        description: "Application submitted successfully!"
      });
      navigate("/thank-you");
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="founderName">Founder Name *</Label>
          <Input
            id="founderName"
            value={formData.founderName}
            onChange={(e) => handleInputChange("founderName", e.target.value)}
            placeholder="Enter founder name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="startupName">Startup Name *</Label>
          <Input
            id="startupName"
            value={formData.startupName}
            onChange={(e) => handleInputChange("startupName", e.target.value)}
            placeholder="Enter startup name"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter email"
            className="mt-1"
            disabled
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyType">Company Type *</Label>
          <Select onValueChange={(value) => handleInputChange("companyType", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select company type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pvt-ltd">Private Limited</SelectItem>
              <SelectItem value="llp">LLP</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="teamSize">Team Size *</Label>
          <Select onValueChange={(value) => handleInputChange("teamSize", value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select team size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 member</SelectItem>
              <SelectItem value="2-5">2-5 members</SelectItem>
              <SelectItem value="6-10">6-10 members</SelectItem>
              <SelectItem value="11-20">11-20 members</SelectItem>
              <SelectItem value="20+">20+ members</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="couponCode">Coupon Code (Optional)</Label>
        <Input
          id="couponCode"
          value={formData.couponCode}
          onChange={(e) => handleInputChange("couponCode", e.target.value)}
          placeholder="Enter coupon code if you have one"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="incubationCentre">Incubation Centre *</Label>
        <Select onValueChange={(value) => handleInputChange("incubationCentre", value)}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select incubation centre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iit-delhi">IIT Delhi Incubation Centre</SelectItem>
            <SelectItem value="iit-bombay">IIT Bombay Incubation Centre</SelectItem>
            <SelectItem value="iim-ahmedabad">IIM Ahmedabad CIIE</SelectItem>
            <SelectItem value="t-hub">T-Hub Hyderabad</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="registrationCertificate">Registration Certificate *</Label>
        <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <input
            type="file"
            id="registrationCertificate"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload("registrationCertificate", e.target.files?.[0] || null)}
            className="hidden"
          />
          <label htmlFor="registrationCertificate" className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700">Upload file</span>
            <span className="text-gray-500"> or drag and drop</span>
          </label>
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
          {formData.registrationCertificate && (
            <p className="text-sm text-green-600 mt-2">
              File uploaded: {formData.registrationCertificate.name}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="incubationLetter">Incubation Letter (Optional)</Label>
        <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <input
            type="file"
            id="incubationLetter"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload("incubationLetter", e.target.files?.[0] || null)}
            className="hidden"
          />
          <label htmlFor="incubationLetter" className="cursor-pointer">
            <span className="text-blue-600 hover:text-blue-700">Upload file</span>
            <span className="text-gray-500"> or drag and drop</span>
          </label>
          <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
          {formData.incubationLetter && (
            <p className="text-sm text-green-600 mt-2">
              File uploaded: {formData.incubationLetter.name}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="websiteLink">Website Link</Label>
        <Input
          id="websiteLink"
          type="url"
          value={formData.websiteLink}
          onChange={(e) => handleInputChange("websiteLink", e.target.value)}
          placeholder="https://yourwebsite.com"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="ideaDescription">Describe Your Idea *</Label>
        <Textarea
          id="ideaDescription"
          value={formData.ideaDescription}
          onChange={(e) => handleInputChange("ideaDescription", e.target.value)}
          placeholder="Tell us about your startup idea, the problem it solves, and your unique solution..."
          className="mt-1 min-h-[120px]"
        />
      </div>

      <div>
        <Label>Expectations from Dreamers *</Label>
        <div className="mt-2 space-y-3">
          {[
            "Mentorship and Guidance",
            "Funding Support",
            "Network Access",
            "Technical Resources",
            "Market Research",
            "Legal Support",
            "Marketing Assistance"
          ].map((expectation) => (
            <div key={expectation} className="flex items-center space-x-2">
              <Checkbox
                id={expectation}
                checked={formData.expectations.includes(expectation)}
                onCheckedChange={(checked) => handleExpectationChange(expectation, checked as boolean)}
              />
              <Label htmlFor={expectation} className="text-sm font-normal">
                {expectation}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="challenges">Current Challenges (Optional)</Label>
        <Textarea
          id="challenges"
          value={formData.challenges}
          onChange={(e) => handleInputChange("challenges", e.target.value)}
          placeholder="What are the main challenges you're facing with your startup?"
          className="mt-1 min-h-[100px]"
        />
      </div>
    </div>
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Dreamers Application
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowSupportForm(true)}
              className="flex items-center space-x-2"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Support</span>
            </Button>
          </div>
          <p className="text-gray-600">Complete your startup application in 3 simple steps</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl">
                Step {currentStep} of 3
              </CardTitle>
              <div className="text-sm text-gray-500">
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Documentation"}
                {currentStep === 3 && "About Your Startup"}
              </div>
            </div>
            <Progress value={(currentStep / 3) * 100} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 flex items-center"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {showSupportForm && (
          <SupportForm onClose={() => setShowSupportForm(false)} />
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
