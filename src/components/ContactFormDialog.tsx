"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";

interface ContactFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: string;
}

// Auto-detect service from selectedPlan string
function detectServiceFromPlan(plan?: string): string {
  if (!plan) return "";
  const lower = plan.toLowerCase();
  if (lower.includes("woocommerce")) return "E-Commerce Solutions";
  if (lower.includes("magento") || lower.includes("adobe"))
    return "E-Commerce Solutions";
  if (lower.includes("shopify plus")) return "Shopify Plus";
  if (lower.includes("shopify theme")) return "Shopify Themes";
  if (lower.includes("shopify app")) return "Shopify App Development";
  if (lower.includes("shopify")) return "Shopify Development";
  if (
    lower.includes("erp") ||
    lower.includes("ekasys") ||
    lower.includes("medoc")
  )
    return "ERP Solutions";
  if (lower.includes("ai") || lower.includes("automation"))
    return "AI & Automation";
  if (lower.includes("seo")) return "SEO, AEO & Content Strategy";
  if (lower.includes("ppc") || lower.includes("advertising"))
    return "Paid Advertising (PPC)";
  if (lower.includes("social")) return "Social Media & Branding";
  if (lower.includes("web")) return "Web Development";
  if (lower.includes("app") || lower.includes("mobile"))
    return "App Development";
  if (lower.includes("marketing")) return "Digital Marketing";
  return "";
}

const ContactFormDialog = ({
  open,
  onOpenChange,
  selectedPlan,
}: ContactFormDialogProps) => {
  const handleClose = (val: boolean) => {
    onOpenChange(val);
  };

  const detectedService = detectServiceFromPlan(selectedPlan);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg bg-hero border-hero-foreground/10 text-hero-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-hero-foreground">
            Get in Touch
          </DialogTitle>
          <DialogDescription className="text-hero-foreground/50">
            Fill in the form below and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form
          action="https://formsubmit.co/info@globify.in"
          method="POST"
          className="flex flex-col gap-4 mt-2"
        >
          <input
            type="hidden"
            name="_next"
            ref={(node) => {
              if (node && typeof window !== "undefined")
                node.value = window.location.origin + "/thank-you";
            }}
          />
          <input
            type="hidden"
            name="_autoresponse"
            value="Thank you for reaching out to Globify. We have received your query and our team will get back to you within 24 hours."
          />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="New Lead: Contact Us - globify.in"
          />
          <input
            type="text"
            id="_phone_extension"
            name="_phone_extension"
            className="absolute left-[-9999px]"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-hero-foreground/70 text-sm">
                Full Name *
              </Label>
              <Input
                id="name"
                name="name"
                required
                maxLength={100}
                placeholder="John Doe"
                className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-hero-foreground/70 text-sm"
              >
                Email *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                maxLength={255}
                placeholder="john@company.com"
                className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-hero-foreground/70 text-sm"
              >
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                maxLength={20}
                placeholder="+971 50 000 0000"
                className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="company"
                className="text-hero-foreground/70 text-sm"
              >
                Company
              </Label>
              <Input
                id="company"
                name="company"
                maxLength={100}
                placeholder="Company Name"
                className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="service"
              className="text-hero-foreground/70 text-sm"
            >
              Service Interested In
            </Label>
            <select
              id="service"
              name="service"
              defaultValue={detectedService}
              className="w-full h-10 rounded-md border bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground px-3 text-sm"
            >
              <option value="">Select a service</option>
              <option disabled className="font-semibold">
                ── Web & App Development ──
              </option>
              <option>Web Development</option>
              <option>App Development</option>
              <option>Shopify Development</option>
              <option>Shopify Plus</option>
              <option>Shopify Themes</option>
              <option>Shopify App Development</option>
              <option disabled className="font-semibold">
                ── Digital Marketing ──
              </option>
              <option>Digital Marketing</option>
              <option>SEO, AEO & Content Strategy</option>
              <option>Paid Advertising (PPC)</option>
              <option>Social Media & Branding</option>
              <option>CRO & Revenue Engineering</option>
              <option disabled className="font-semibold">
                ── AI & Automation ──
              </option>
              <option>AI & Automation</option>
              <option>AI Chatbots</option>
              <option>Process Automation</option>
              <option>Predictive Analytics</option>
              <option>AI Transformation Framework</option>
              <option disabled className="font-semibold">
                ── Enterprise Solutions ──
              </option>
              <option>E-Commerce Solutions</option>
              <option>ERP Solutions</option>
              <option>Digital Transformation</option>
            </select>
          </div>
          {selectedPlan && (
            <div className="space-y-2">
              <Label htmlFor="plan" className="text-hero-foreground/70 text-sm">
                Selected Package
              </Label>
              <Input
                id="plan"
                name="plan"
                readOnly
                value={selectedPlan}
                className="bg-primary/10 border-primary/20 text-hero-foreground font-semibold cursor-default"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-hero-foreground/70 text-sm"
            >
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              maxLength={2000}
              rows={3}
              placeholder="Tell us about your project..."
              className="bg-hero-foreground/5 border-hero-foreground/10 text-hero-foreground placeholder:text-hero-foreground/30 resize-none"
            />
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-1 gap-2"
          >
            Send Message
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormDialog;
