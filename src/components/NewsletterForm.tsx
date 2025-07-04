import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterFormProps {
  variant?: "default" | "hero";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export const NewsletterForm = ({ variant = "default", size = "default", className }: NewsletterFormProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call - In a real app, you'd send this to your backend
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store email locally for demo purposes
      const existingEmails = JSON.parse(localStorage.getItem('newsletter-emails') || '[]');
      if (!existingEmails.includes(email)) {
        existingEmails.push(email);
        localStorage.setItem('newsletter-emails', JSON.stringify(existingEmails));
      }
      
      toast({
        title: "Successfully Subscribed! 🌟",
        description: "You'll receive the latest eco-learning tips and challenges.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-2 ${className}`}>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className="flex-1"
        />
        <Button 
          type="submit"
          variant={variant}
          size={size}
          disabled={isSubmitting || !email}
        >
          {isSubmitting ? "..." : "Subscribe"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Join 10,000+ learners. Unsubscribe anytime.
      </p>
    </form>
  );
};