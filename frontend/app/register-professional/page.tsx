"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, Upload } from "lucide-react"
import { registerProfessional } from "@/app/actions/professional-actions"

export default function RegisterProfessionalPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalcode: "",

    profileImage: "",
    password: "", // Add this line

    // Professional Details
    jobTitle: "",
    hourlyRate: "",
    yearsExperience: "",
    bio: "",
    about: "",

    // Skills & Availability
    skills: [] as string[],
    availability: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    preferredHours: "",
    noticeRequired: "",

    // Certifications & Experience
    certifications: [] as { name: string; issuer: string; year: string }[],
    experiences: [] as { position: string; company: string; period: string; description: string }[],

    // Terms
    agreeToTerms: false,
    agreeToBackground: false,
  })

  // Temporary state for adding new items
  const [newSkill, setNewSkill] = useState("")
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    year: "",
  })
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    period: "",
    description: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: checked,
      },
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    if (newCertification.name.trim() && newCertification.issuer.trim() && newCertification.year.trim()) {
      setFormData((prev) => ({
        ...prev,
        certifications: [...prev.certifications, { ...newCertification }],
      }))
      setNewCertification({
        name: "",
        issuer: "",
        year: "",
      })
    }
  }

  const removeCertification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }))
  }

  const addExperience = () => {
    if (newExperience.position.trim() && newExperience.company.trim() && newExperience.period.trim()) {
      setFormData((prev) => ({
        ...prev,
        experiences: [...prev.experiences, { ...newExperience }],
      }))
      setNewExperience({
        position: "",
        company: "",
        period: "",
        description: "",
      })
    }
  }

  const removeExperience = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const [submitError, setSubmitError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
  
    // Log initial state for debugging
    console.log("Initial form state:", JSON.stringify(formData));
  
    try {
      // Create a new FormData instance
      const fd = new FormData();
  
      // Convert formData state to FormData instance
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "availability" && value) {
          // Append each day from availability as separate entries
          Object.entries(value as Record<string, boolean>).forEach(([day, isAvailable]) => {
            fd.append(day, isAvailable.toString());
          });
        } else if (key === "skills" && Array.isArray(value)) {
          // Append each skill separately
          value.forEach((skill : any) => fd.append("skills", skill));
        } else if (key === "certifications" && Array.isArray(value)) {
          // Append each certification as a JSON string
          value.forEach((cert) => fd.append("certifications", JSON.stringify(cert)));
        } else if (key === "experiences" && Array.isArray(value)) {
          // Append each experience as a JSON string
          value.forEach((exp) => fd.append("experiences", JSON.stringify(exp)));
        } else {
          // For simple keys (string, boolean, etc.)
          fd.append(key, value as string | Blob);
        }
      });
  
      // Optional: Debug the FormData entries
      const entries = Array.from(fd.entries());
      console.log("FormData entries:", entries);
  
      // Submit the FormData object
      const result = await registerProfessional(fd);
      if (!result.success) {
        throw new Error(result.error);
      }
  
      // On success, mark as submitted and reset the state
      setSubmitted(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        postalcode: "",
        profileImage: "",
        password: "",
        jobTitle: "",
        hourlyRate: "",
        yearsExperience: "",
        bio: "",
        about: "",
        skills: [] as string[],
        availability: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
        preferredHours: "",
        noticeRequired: "",
        certifications: [] as { name: string; issuer: string; year: string }[],
        experiences: [] as { position: string; company: string; period: string; description: string }[],
        agreeToTerms: false,
        agreeToBackground: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsComplete(true)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-black to-gray-900 py-12 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl font-bold md:text-4xl">Join Our Professional Network</h1>
            <p className="mt-4 max-w-2xl text-gray-300">
              Create your professional profile and start receiving job opportunities from event organizers.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:px-6">
          {!isComplete ? (
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-primary">Professional Registration</h2>
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 1 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      1
                    </div>
                    <div className={`h-1 w-8 ${step >= 2 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 2 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      2
                    </div>
                    <div className={`h-1 w-8 ${step >= 3 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 3 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      3
                    </div>
                    <div className={`h-1 w-8 ${step >= 4 ? "bg-primary" : "bg-gray-200"}`}></div>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        step >= 4 ? "bg-primary text-white" : "bg-gray-200"
                      }`}
                    >
                      4
                    </div>
                  </div>
                </div>
              </div>

              <Card className="border-primary/10 shadow-lg">
                <CardContent className="p-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">Personal Information</h3>
                        <p className="text-gray-500">Tell us about yourself so event organizers can get to know you.</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-0">
                          <Label htmlFor="password">Password *</Label>
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password || ""}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            required
                            placeholder="Create a secure password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-4">
                        <div>
                        <Label htmlFor="Address">Address*</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="123 Street"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                        </div>
                        <div>
                        <Label htmlFor="city">City*</Label>
                        <Input
                          id="city"
                          name="city"
                          placeholder="Toronto"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                        </div>
                        <div className="md:px-12">
                        <Label htmlFor="province">Province *</Label>
                        <Input
                          id="province"
                          name="province"
                          placeholder="ON"
                          value={formData.province}
                          onChange={handleChange}
                          required
                        />
                        </div>
                        <div className="md:px-8">
                        <Label htmlFor="postalcode">Postal code *</Label>
                        <Input
                          id="postalcode"
                          name="postalcode"
                          placeholder="R1C 1A1"
                          value={formData.postalcode}
                          onChange={handleChange}
                          required
                        />
                        </div>

                      </div>

                      <div>
                        <Label htmlFor="profileImage">Profile Image</Label>
                        <div className="mt-2 flex items-center gap-4">
                          <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                            {formData.profileImage ? (
                              <img
                                src={formData.profileImage || "/placeholder.svg"}
                                alt="Profile"
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-gray-400">
                                No image
                              </div>
                            )}
                          </div>
                          <Button variant="outline" type="button" className="flex items-center gap-2">
                            <Upload size={16} />
                            Upload Image
                          </Button>
                          <p className="text-xs text-gray-500">JPG, PNG or GIF, max 5MB</p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">Professional Details</h3>
                        <p className="text-gray-500">Tell us about your professional background and what you offer.</p>
                      </div>

                      <div>
                        <Label htmlFor="jobTitle">Job Title/Position *</Label>
                        <Select
                          value={formData.jobTitle}
                          onValueChange={(value) => handleSelectChange("jobTitle", value)}
                        >
                          <SelectTrigger id="jobTitle">
                            <SelectValue placeholder="Select your job title" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bartender">Bartender</SelectItem>
                            <SelectItem value="server">Server/Waitstaff</SelectItem>
                            <SelectItem value="security">Security Staff</SelectItem>
                            <SelectItem value="hostess">Host/Hostess</SelectItem>
                            <SelectItem value="chef">Chef/Cook</SelectItem>
                            <SelectItem value="coordinator">Event Coordinator</SelectItem>
                            <SelectItem value="technician">AV Technician</SelectItem>
                            <SelectItem value="cleaner">Cleaning Staff</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="hourlyRate">Hourly Rate (CAD) *</Label>
                          <Input
                            id="hourlyRate"
                            name="hourlyRate"
                            type="number"
                            min="15"
                            placeholder="25"
                            value={formData.hourlyRate}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="yearsExperience">Years of Experience *</Label>
                          <Select
                            value={formData.yearsExperience}
                            onValueChange={(value) => handleSelectChange("yearsExperience", value)}
                          >
                            <SelectTrigger id="yearsExperience">
                              <SelectValue placeholder="Select years" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-1">Less than 1 year</SelectItem>
                              <SelectItem value="1-3">1-3 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="5-10">5-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="bio">Short Bio (1-2 sentences) *</Label>
                        <Input
                          id="bio"
                          name="bio"
                          placeholder="Experienced bartender specializing in craft cocktails and high-volume service."
                          value={formData.bio}
                          onChange={handleChange}
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          This will appear in search results and listings (max 150 characters)
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="about">About Me *</Label>
                        <Textarea
                          id="about"
                          name="about"
                          placeholder="Describe your experience, specialties, and what makes you stand out..."
                          rows={5}
                          value={formData.about}
                          onChange={handleChange}
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Detailed description of your background and services (max 1000 characters)
                        </p>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">Skills & Availability</h3>
                        <p className="text-gray-500">
                          Let event organizers know your skills and when you're available to work.
                        </p>
                      </div>

                      <div>
                        <Label>Skills & Expertise</Label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm"
                            >
                              {skill}
                              <button
                                type="button"
                                onClick={() => removeSkill(index)}
                                className="ml-1 text-gray-500 hover:text-red-500"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Add a skill (e.g., Craft Cocktails)"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addSkill()
                              }
                            }}
                          />
                          <Button type="button" variant="outline" onClick={addSkill}>
                            Add
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label>Availability</Label>
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-gray-500">Select the days you're typically available to work:</p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {Object.entries(formData.availability).map(([day, isAvailable]) => (
                              <div key={day} className="flex items-center space-x-2">
                                <Checkbox
                                  id={day}
                                  checked={isAvailable}
                                  onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
                                />
                                <label htmlFor={day} className="text-sm capitalize">
                                  {day}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <Label htmlFor="preferredHours">Preferred Hours</Label>
                          <Select
                            value={formData.preferredHours}
                            onValueChange={(value) => handleSelectChange("preferredHours", value)}
                          >
                            <SelectTrigger id="preferredHours">
                              <SelectValue placeholder="Select preferred hours" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mornings">Mornings (6AM-12PM)</SelectItem>
                              <SelectItem value="afternoons">Afternoons (12PM-5PM)</SelectItem>
                              <SelectItem value="evenings">Evenings (5PM-10PM)</SelectItem>
                              <SelectItem value="nights">Nights (10PM-6AM)</SelectItem>
                              <SelectItem value="weekends">Weekends Only</SelectItem>
                              <SelectItem value="flexible">Flexible Hours</SelectItem>
                              <SelectItem value="fulltime">Full-time (40hrs/week)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="noticeRequired">Notice Required</Label>
                          <Select
                            value={formData.noticeRequired}
                            onValueChange={(value) => handleSelectChange("noticeRequired", value)}
                          >
                            <SelectTrigger id="noticeRequired">
                              <SelectValue placeholder="Select notice required" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="same-day">Same Day</SelectItem>
                              <SelectItem value="24h">24 Hours</SelectItem>
                              <SelectItem value="48h">48 Hours</SelectItem>
                              <SelectItem value="72h">72 Hours</SelectItem>
                              <SelectItem value="1-week">1 Week</SelectItem>
                              <SelectItem value="2-weeks">2+ Weeks</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button onClick={nextStep} className="bg-primary hover:bg-primary/90">
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">Certifications & Experience</h3>
                        <p className="text-gray-500">
                          Add your relevant certifications and work experience to stand out.
                        </p>
                      </div>

                      <div>
                        <Label>Certifications & Licenses</Label>
                        <div className="mt-2 space-y-4">
                          {formData.certifications.map((cert, index) => (
                            <div key={index} className="rounded-lg border p-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{cert.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {cert.issuer} • {cert.year}
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeCertification(index)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}

                          <div className="rounded-lg border p-3">
                            <div className="grid gap-3 md:grid-cols-3">
                              <div className="md:col-span-1">
                                <Label htmlFor="certName">Certification Name</Label>
                                <Input
                                  id="certName"
                                  value={newCertification.name}
                                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                                  placeholder="e.g., Smart Serve"
                                />
                              </div>
                              <div className="md:col-span-1">
                                <Label htmlFor="certIssuer">Issuing Organization</Label>
                                <Input
                                  id="certIssuer"
                                  value={newCertification.issuer}
                                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                                  placeholder="e.g., Smart Serve Ontario"
                                />
                              </div>
                              <div>
                                <Label htmlFor="certYear">Year</Label>
                                <Input
                                  id="certYear"
                                  value={newCertification.year}
                                  onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                                  placeholder="e.g., 2022"
                                />
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addCertification}
                              className="mt-3"
                            >
                              Add Certification
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label>Work Experience</Label>
                        <div className="mt-2 space-y-4">
                          {formData.experiences.map((exp, index) => (
                            <div key={index} className="rounded-lg border p-3">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">
                                    {exp.position} at {exp.company}
                                  </p>
                                  <p className="text-sm text-gray-500">{exp.period}</p>
                                  <p className="mt-1 text-sm">{exp.description}</p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeExperience(index)}
                                  className="text-gray-500 hover:text-red-500"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}

                          <div className="rounded-lg border p-3">
                            <div className="grid gap-3 md:grid-cols-2">
                              <div>
                                <Label htmlFor="expPosition">Position</Label>
                                <Input
                                  id="expPosition"
                                  value={newExperience.position}
                                  onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                                  placeholder="e.g., Head Bartender"
                                />
                              </div>
                              <div>
                                <Label htmlFor="expCompany">Company</Label>
                                <Input
                                  id="expCompany"
                                  value={newExperience.company}
                                  onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                  placeholder="e.g., The Craft House"
                                />
                              </div>
                              <div>
                                <Label htmlFor="expPeriod">Period</Label>
                                <Input
                                  id="expPeriod"
                                  value={newExperience.period}
                                  onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                                  placeholder="e.g., 2019 - Present"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <Label htmlFor="expDescription">Description</Label>
                                <Textarea
                                  id="expDescription"
                                  value={newExperience.description}
                                  onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                  placeholder="Brief description of your responsibilities and achievements"
                                  rows={2}
                                />
                              </div>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={addExperience} className="mt-3">
                              Add Experience
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 rounded-lg bg-gray-50 p-4">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToTerms"
                            checked={formData.agreeToTerms}
                            onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
                            required
                          />
                          <div>
                            <label htmlFor="agreeToTerms" className="text-sm font-medium">
                              I agree to the Terms of Service and Privacy Policy *
                            </label>
                            <p className="text-xs text-gray-500">
                              By checking this box, you agree to our Terms of Service and acknowledge that you have read
                              our Privacy Policy.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id="agreeToBackground"
                            checked={formData.agreeToBackground}
                            onCheckedChange={(checked) => handleCheckboxChange("agreeToBackground", checked as boolean)}
                            required
                          />
                          <div>
                            <label htmlFor="agreeToBackground" className="text-sm font-medium">
                              I understand that background checks may be required *
                            </label>
                            <p className="text-xs text-gray-500">
                              StaffOnSite may require background checks for certain positions to ensure the safety and
                              security of events.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <Button type="button" variant="outline" onClick={prevStep}>
                          Back
                        </Button>
                        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                          {isSubmitting ? "Submitting..." : "Complete Registration"}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">Registration Complete!</h2>
              <p className="mt-4 text-gray-600">
                Thank you for registering as a professional with StaffOnSite. Your profile has been submitted for
                review. We'll notify you once your profile is approved and visible to event organizers.
              </p>
              <div className="mt-8 space-y-4">
                <Button onClick={() => router.push("/")} className="w-full bg-primary hover:bg-primary/90 sm:w-auto">
                  Return to Home
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
