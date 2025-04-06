import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

// Define the event type locally
interface SelectEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  created_at: string;
  eventDate: string;
  duration: number;
  price: number;
  capacity: number;
}

export default function Events() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date(),
  );

  const { data: events, isLoading } = useQuery<SelectEvent[]>({
    queryKey: ["/api/events"],
  });

  // Filter events for the selected date
  const selectedDateEvents = events?.filter((event) => {
    const eventDate = new Date(event.eventDate);
    return (
      eventDate.getDate() === selectedDate?.getDate() &&
      eventDate.getMonth() === selectedDate?.getMonth() &&
      eventDate.getFullYear() === selectedDate?.getFullYear()
    );
  });

  // Get all dates with events for the calendar
  const dates = React.useMemo(() => {
    if (!events) return [];
    return events.map((event) => new Date(event.eventDate));
  }, [events]);

  // Get dates with events for calendar highlighting
  const datesWithEvents = events?.reduce((dates: Date[], event) => {
    dates.push(new Date(event.eventDate));
    return dates;
  }, []);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Farm Agenda</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{ hasEvent: datesWithEvents }}
              />
            </CardContent>
          </Card>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? `Events for ${format(selectedDate, "MMMM d, yyyy")}`
                    : "Select a date to view events"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p>Loading events...</p>
                ) : selectedDateEvents && selectedDateEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedDateEvents.map((event) => (
                      <Card key={event.id}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">
                                {event.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {format(new Date(event.eventDate), "h:mm a")} -{" "}
                                {format(
                                  new Date(
                                    new Date(event.eventDate).getTime() +
                                      event.duration * 60000,
                                  ),
                                  "h:mm a",
                                )}
                              </p>
                            </div>
                            <Badge variant="outline">
                              ${(event.price / 100).toFixed(2)}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">
                              {event.capacity} spots available
                            </p>
                            <Button>Book Now</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">
                    No events scheduled for this date.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
