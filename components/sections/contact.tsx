'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent!',
      description: 'Thank you for reaching out. I will get back to you soon.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'santramanoj1997@gmail.com',
      href: 'mailto:santramanoj1997@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9748159138',
      href: 'tel:+919748159138',
      color: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'manoj-santra',
      href: 'https://linkedin.com/in/manoj-santra-38ab181ba',
      color: 'from-teal-500 to-green-500',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'manoj19-github',
      href: 'https://github.com/manoj19-github',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Get In{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let&apos;s work together
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="h-12"
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={6}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer border-2 hover:border-blue-500/50">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
