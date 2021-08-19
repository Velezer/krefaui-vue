let baseUrl = `http://${location.hostname}:8080`

let config = {
    urls: {
        events: `${baseUrl}/api/events`,
        people: `${baseUrl}/api/people`,
        login: `${baseUrl}/oauth2/login`,
        attendancePeople(id) { `${baseUrl}/api/attendance/people/${id}` },
        attendanceEvents(id) { `${baseUrl}/api/attendance/events/${id}` },

    },
    webcam: {
        width: 600, // 4
        height: 600, // 3
        image_format: "jpeg",
        jpeg_quality: 70,
    }
}

export default config