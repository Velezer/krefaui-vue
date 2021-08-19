let baseUrl = `http://${location.hostname}:8080`

let config = {
    urls: {
        events: `${baseUrl}/api/events`,
        login: `${baseUrl}/oauth2/login`,
        attendancePeople(id) { `${baseUrl}/api/attendance/people/${id}` },
        attendanceEvents(id) { `${baseUrl}/api/attendance/events/${id}` },

    }
}

export default config