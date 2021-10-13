import { Calendar } from "react-big-calendar";
import { DateTime } from "luxon";
import styled from "styled-components";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import c from "styles/color";
import m from "styles/measures";
import s from "styles/styles";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const StyledCalendar = styled(Calendar)`
  &.rbc-calendar {
    min-height: 85vh;
    width: ${m.col12};
    margin: ${m.sp4} 0 0;
    .rbc-toolbar-label {
      font-size: ${m.sp7};
      font-weight: 600;
      color: ${c.gray2};
    }
    .rbc-time-view {
      border: none;
      margin: ${m.sp4} ${m.sp4} 0;
      width: ${m.col6};
      align-self: center;
    }
    .rbc-time-content {
      border: none;
    }
    .rbc-btn-group {
      border-radius: ${s.borderRadius};
      outline: none;
      button {
        color: ${c.primary3};
        cursor: pointer;
        border: 1px solid ${c.primary9};
        background-color: transparent;
        box-shadow: none;
        height: ${m.sp8};
        outline: none;
        &.rbc-active,
        :hover {
          background: ${c.primary9};
          border: 1px solid ${c.primary9};
        }
      }
    }
    .rbc-event {
      border-radius: 0;
      border: 1px solid ${c.primary6};
      background-color: ${c.primary6};
      color: ${c.primary9};
    }
    .rbc-header,
    .rbc-month-view,
    .rbc-time-header-content,
    .rbc-time-header-gutter {
      border: none;
    }
    .rbc-month-row,
    .rbc-day-bg {
      border: none;
      border-radius: ${s.borderRadius};
    }
    .rbc-event-label,
    .rbc-allday-cell {
      display: none;
    }
    .rbc-date-cell {
      text-align: center;
      padding: 0;
      a {
        display: inline-block;
        width: 100%;
      }
    }
    .rbc-time-slot {
      border: none;
    }
    .rbc-off-range-bg {
      background-color: ${c.primary9};
    }
    .rbc-toolbar {
      padding: ${m.sp5} ${m.sp7};
    }
    .rbc-month-header {
      border-bottom: 1px solid ${c.primary8};
      padding-bottom: ${m.sp3};
      margin-bottom: ${m.sp5};
    }
    .rbc-timeslot-group {
      border: none;
    }
  }
`;
const chemoAppointments = [
  {
    id: 1,
    patient: "Smith",
    drug: ["VCR", "MTX"],
    allDay: false,
    start: new Date(2021, 1, 3, 10, 0),
    end: new Date(2021, 1, 3, 10, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 4, 12, 0),
    end: new Date(2021, 1, 4, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 4, 12, 0),
    end: new Date(2021, 1, 4, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 5, 12, 0),
    end: new Date(2021, 1, 5, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 5, 13, 0),
    end: new Date(2021, 1, 5, 13, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 5, 14, 0),
    end: new Date(2021, 1, 5, 14, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
  {
    id: 2,
    patient: "Green",
    drug: ["ETOP"],
    allDay: false,
    start: new Date(2021, 1, 3, 12, 0),
    end: new Date(2021, 1, 3, 12, 0),
  },
];

export default function MyCalendar(props) {
  return (
    <div>
      <StyledCalendar
        localizer={localizer}
        events={chemoAppointments}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        min={new Date(2008, 0, 1, 7, 0)}
        max={new Date(2008, 0, 1, 17, 0)}
      />
    </div>
  );
}
