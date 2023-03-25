const moment = require("moment");

const calculateFines = (event) => {
  let students;
  if (event.eventName === "CS GENERAL ASSEMBLY ") {
    students = event.studentLogs.map((s) => {
      let fine = 0;
      let fine1 = 0;
      let fine2 = 0;
      let fine3 = 0;
      let fine4 = 0;
      let wholeDay = 0;

      const name = s.student.name;
      const studentNumber = s.student._id;
      const morningLogin =
        event.in1 !== null
          ? s.login1 !== null
            ? moment(s.login1).format("h:mm:ss a")
            : "Absent"
          : "N/A";
      const morningLogout =
        event.out1 !== null
          ? s.logout1 !== null
            ? moment(s.logout1).format("h:mm:ss a")
            : "Absent"
          : "N/A";
      const afternoonLogin =
        event.in2 !== null
          ? s.login2 !== null
            ? moment(s.login2).format("h:mm:ss a")
            : "Absent"
          : "N/A";
      const afternoonLogout =
        event.out2 !== null
          ? s.logout2 !== null
            ? moment(s.logout2).format("h:mm:ss a")
            : "Absent"
          : "N/A";

      if (s.isExcused) {
        return {
          name,
          studentNumber,
          morningLogin,
          morningLogout,
          afternoonLogin,
          afternoonLogout,
          fine,
        };
      }

      if (
        s.login1 === null &&
        s.login2 === null &&
        s.logout1 === null &&
        s.logout2 === null
      ) {
        if (s.student.isOfficer) {
          fine1 =
            event.in1 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          fine2 =
            event.in2 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          fine3 =
            event.out1 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          fine4 =
            event.out2 === null ? 0 : event.eventType === "minor" ? 50 : 70;
          wholeDay = event.eventType === "minor" ? 100 : 200;
          fine = fine1 + fine2 + fine3 + fine4 + wholeDay;
          return {
            name,
            studentNumber,
            morningLogin,
            morningLogout,
            afternoonLogin,
            afternoonLogout,
            fine,
          };
        }

        fine1 = event.in1 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine2 = event.in2 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine3 = event.out1 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        fine4 = event.out2 === null ? 0 : event.eventType === "minor" ? 20 : 50;
        wholeDay = event.eventType === "minor" ? 50 : 150;
        fine = fine1 + fine2 + fine3 + fine4 + wholeDay;

        return {
          name,
          studentNumber,
          morningLogin,
          morningLogout,
          afternoonLogin,
          afternoonLogout,
          fine,
        };
      }

      if (event.eventType === "major") {
        if (event.in1 === null) {
          fine1 = 0;
        } else if (s.login1 === null) {
          if (s.student.isOfficer) {
            fine1 += 70;
          } else {
            fine1 += 50;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd1).diff(moment(s.login1)))
            .asMinutes();
          if (minutesLate > 0) {
            fine1 += Math.min(
              Math.ceil(minutesLate / 15) * 5,
              s.student.isOfficer ? 60 : 50
            );

            if (s.student.isOfficer && minutesLate > 45) {
              fine1 += 10;
            }
          }
        }
        if (event.in2 === null) {
          fine2 = 0;
        } else if (s.login2 === null) {
          if (s.student.isOfficer) {
            fine2 += 70;
          } else {
            fine2 += 50;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd2).diff(moment(s.login2)))
            .asMinutes();
          if (minutesLate > 0) {
            fine2 += Math.min(
              Math.ceil(minutesLate / 15) * 5,
              s.student.isOfficer ? 60 : 50
            );
            if (s.student.isOfficer && minutesLate > 45) {
              fine2 += 10;
            }
          }
        }

        if (event.out1 === null) {
          fine3 = 0;
        } else if (s.logout1 === null) {
          if (s.student.isOfficer) {
            fine3 += 70;
          } else {
            fine3 += 50;
          }
        }

        if (event.out2 === null) {
          fine4 = 0;
        } else if (s.logout2 === null) {
          if (s.student.isOfficer) {
            fine4 += 70;
          } else {
            fine4 += 50;
          }
        }
      } else {
        if (event.in1 === null) {
          fine1 = 0;
        } else if (s.login1 === null) {
          if (s.student.isOfficer) {
            fine1 += 50;
          } else {
            fine1 += 20;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd1).diff(moment(s.login1)))
            .asMinutes();
          if (minutesLate > 0) {
            fine1 += Math.min(
              Math.ceil(minutesLate / 12) * 2,
              s.student.isOfficer ? 40 : 20
            );
            if (s.student.isOfficer && minutesLate > 45) {
              fine1 += 10;
            }
          }
        }
        if (event.in2 === null) {
          fine2 = 0;
        } else if (s.login2 === null) {
          if (s.student.isOfficer) {
            fine2 += 50;
          } else {
            fine2 += 20;
          }
        } else {
          const minutesLate = -moment
            .duration(moment(event.inEnd2).diff(moment(s.login2)))
            .asMinutes();
          if (minutesLate > 0) {
            fine2 += Math.min(
              Math.ceil(minutesLate / 12) * 2,
              s.student.isOfficer ? 40 : 20
            );
            if (s.student.isOfficer && minutesLate > 45) {
              fine2 += 10;
            }
          }
        }

        if (event.out1 === null) {
          fine3 = 0;
        } else if (s.logout1 === null) {
          if (s.student.isOfficer) {
            fine3 += 50;
          } else {
            fine3 += 20;
          }
        }

        if (event.out2 === null) {
          fine4 = 0;
        } else if (s.logout2 === null) {
          if (s.student.isOfficer) {
            fine4 += 50;
          } else {
            fine4 += 20;
          }
        }
      }

      fine = fine1 + fine2 + fine3 + fine4 + wholeDay;

      return {
        name,
        studentNumber,
        morningLogin,
        morningLogout,
        afternoonLogin,
        afternoonLogout,
        fine,
      };
    });
    return students;
  }

  students = event.studentLogs.map((s) => {
    if (event.hasNoFines === true) {
      return {
        ...s,
        fine: 0,
        fine1: 0,
        fine2: 0,
        fine3: 0,
        fine4: 0,
        wholeDay: 0,
      };
    }
    const fine1 =
      event.in1 !== null && s.login1 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine2 =
      event.in2 !== null && s.login2 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine3 =
      event.out1 !== null && s.logout1 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    const fine4 =
      event.out2 !== null && s.logout2 === null
        ? s.student.isOfficer
          ? 50
          : 25
        : 0;
    let wholeDay = 0;
    if (
      s.login1 === null &&
      s.login2 === null &&
      s.logout1 === null &&
      s.logout2 === null
    ) {
      wholeDay = s.student.isOfficer ? 200 : 100;
    }
    const fine = fine1 + fine2 + fine3 + fine4 + wholeDay;
    const name = s.student.name;
    const studentNumber = s.student._id;
    const morningLogin =
      event.in1 !== null
        ? s.login1 !== null
          ? moment(s.login1).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    const morningLogout =
      event.out1 !== null
        ? s.logout1 !== null
          ? moment(s.logout1).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    const afternoonLogin =
      event.in2 !== null
        ? s.login2 !== null
          ? moment(s.login2).format("h:mm:ss a")
          : "Absent"
        : "N/A";
    const afternoonLogout =
      event.out2 !== null
        ? s.logout2 !== null
          ? moment(s.logout2).format("h:mm:ss a")
          : "Absent"
        : "N/A";

    console.log({ morningLogin, login1: s.login1 });
    return {
      name,
      studentNumber,
      morningLogin,
      morningLogout,
      afternoonLogin,
      afternoonLogout,
      fine,
    };
  });

  // console.log({ students: students.slice(0, 5), message: "utils.js" });
  return students;
};

module.exports = calculateFines;
