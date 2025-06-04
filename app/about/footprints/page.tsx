"use client";

import { useState,useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { Flag, Book, Home, Globe, Laptop, Users } from "lucide-react";
import type React from "react";
import { createClient } from "../../../utils/supabase/client";
import { toast } from "../../../components/ui/use-toast";

interface TimelineEvent {
  id:number;
  year: number;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const enrichedevents: TimelineEvent[] = [
  // {
  //   year: 1950,
  //   title: "Community Foundation",
  //   description:
  //     "Our Marathi community organization was established with the aim of preserving and promoting Marathi culture and language in our area.",
  //   icon: <Flag className="w-8 h-8 text-[#B22222]" />,
  // },
  // {
  //   year: 1975,
  //   title: "First Cultural Festival",
  //   description:
  //     "Organized the first annual Marathi cultural festival, showcasing traditional music, dance, and cuisine. It became an instant hit and a yearly tradition.",
  //   icon: <Users className="w-8 h-8 text-[#B22222]" />,
  // },
  // {
  //   year: 1990,
  //   title: "Language School",
  //   description:
  //     "Opened a Marathi language school for the next generation to ensure the continuity of our mother tongue and cultural heritage.",
  //   icon: <Book className="w-8 h-8 text-[#B22222]" />,
  // },
  // {
  //   year: 2000,
  //   title: "Community Center",
  //   description:
  //     "Inaugurated our own community center, providing a dedicated space for cultural events, classes, and community gatherings.",
  //   icon: <Home className="w-8 h-8 text-[#B22222]" />,
  // },
  // {
  //   year: 2010,
  //   title: "Outreach Program",
  //   description:
  //     "Started a cultural exchange program with other communities to promote intercultural understanding and showcase Marathi culture to a wider audience.",
  //   icon: <Globe className="w-8 h-8 text-[#B22222]" />,
  // },
  // {
  //   year: 2020,
  //   title: "Digital Transformation",
  //   description:
  //     "Launched online classes and virtual events in response to global challenges, ensuring our community stays connected and engaged regardless of physical limitations.",
  //   icon: <Laptop className="w-8 h-8 text-[#B22222]" />,
  // },
]

export default function FootprintsPage() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(
    null
  );
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  // function getIconComponent(type: string): React.ReactNode {
  //   const iconProps = { className: "w-8 h-8 text-[#B22222]" };
  //   switch (type) {
  //     case "flag":
  //       return <Flag {...iconProps} />;
  //     case "book":
  //       return <Book {...iconProps} />;
  //     case "home":
  //       return <Home {...iconProps} />;
  //     case "globe":
  //       return <Globe {...iconProps} />;
  //     case "laptop":
  //       return <Laptop {...iconProps} />;
  //     case "users":
  //       return <Users {...iconProps} />;
  //     default:
  //       return <Flag {...iconProps} />;
  //   }
  // }
  useEffect(() => {
    fetchFootprints();
  }, []);

  const supabase = createClient();

  const fetchFootprints = async () => {
    const { data: footprintData, error: footprintError } = await supabase
      .from("Footprints")
      .select("*")
      .order("event_year", { ascending: true });

    if (footprintError) {
      toast({
        title: "Error",
        description: "Failed to fetch footprints",
        variant: "destructive",
      });
     
      return;
    }
   
    const enrichedEvents: TimelineEvent[] = footprintData.map((item: any) => ({
      id:item.id,
      year: item.event_year,
      title: item.event_name,
      description: item.event_desc,
      icon:  <Flag className="w-8 h-8 text-[#B22222]" />, // assuming you store icon_type like "flag"
    }));
    
    setEvents(enrichedEvents);
    // setLoading(false);
  };
  
  return (
    <div className="min-h-screen bg-[#FFF9E6] py-8 px-4">
      <div className="container mx-auto pb-8">
        {" "}
        {/* Updated container padding */}
        <div className="bg-black py-6 mb-12">
          {" "}
          {/* Updated h1 container */}
          <h1 className="text-3xl font-bold text-center text-white">
            Our Footprints
          </h1>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#B22222] transform -translate-x-1/2"></div>
          {events.map((event, index) => (
            <div
            key={event.id}
              className="mb-16 flex justify-between items-center"
            >
              {index % 2 === 0 ? (
                <>
                  <TimelineContent event={event} index={index} side="left" />
                  <TimelineIcon
                    event={event}
                    index={index}
                    setSelectedEventIndex={setSelectedEventIndex}
                  />
                  <div className="w-5/12"></div>
                </>
              ) : (
                <>
                  <div className="w-5/12"></div>
                  <TimelineIcon
                    event={event}
                    index={index}
                    setSelectedEventIndex={setSelectedEventIndex}
                  />
                  <TimelineContent event={event} index={index} side="right" />
                </>
              )}
            </div>
          ))}
        </div>
        <AnimatePresence>
          {selectedEventIndex !== null && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedEventIndex(null)}
            >
              <Card
                className="bg-white border-2 border-[#B22222] max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <CardHeader>
                  <CardTitle className="text-2xl text-[#B22222] flex items-center">
                    {events[selectedEventIndex].icon}
                    <span className="ml-2">
                      {events[selectedEventIndex].year}:{" "}
                      {events[selectedEventIndex].title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[#4A2C2A]">
                    {events[selectedEventIndex].description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TimelineContent({
  event,
  index,
  side,
}: {
  event: TimelineEvent;
  index: number;
  side: "left" | "right";
}) {
  return (
    <motion.div
      className={`w-5/12 ${side === "left" ? "text-right pr-8" : "pl-8"}`}
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h3 className="text-xl font-bold text-[#B22222] mb-2">{event.year}</h3>
      <h4 className="text-lg font-semibold text-[#4A2C2A] mb-2">
        {event.title}
      </h4>
      <p className="text-[#4A2C2A] text-sm">{event.description}</p>
    </motion.div>
  );
}

function TimelineIcon({
  event,
  index,
  setSelectedEventIndex,
}: {
  event: TimelineEvent;
  index: number;
  setSelectedEventIndex: (index: number) => void;
}) {
  return (
    <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
      <motion.div
        className="w-12 h-12 bg-white rounded-full border-4 border-[#B22222] flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.1 }}
        onClick={() => setSelectedEventIndex(index)}
      >
        {event.icon}
      </motion.div>
    </div>
  );
}
