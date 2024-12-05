import sortBy from "lodash/sortBy";
import { TicketType } from "../types";

const priceWeight = 0.7;
const durationWeight = 0.3;

const calculateOptimalScore = (ticket: TicketType): number => {
  const totalDuration = ticket.segments.reduce(
    (total, segment) => total + segment.duration,
    0
  );
  return ticket.price * priceWeight + totalDuration * durationWeight;
};

const sortedTickets = (
  tickets: TicketType[],
  filteredState: string | null
): TicketType[] => {
  switch (filteredState) {
    case "cheepest": {
      return sortBy(tickets, "price");
    }

    case "fastest": {
      return sortBy(tickets, (ticket) =>
        ticket.segments.reduce((total, segment) => total + segment.duration, 0)
      );
    }

    case "optimal": {
      return sortBy(tickets, calculateOptimalScore);
    }

    default:
      return tickets;
  }
};

export default sortedTickets;
