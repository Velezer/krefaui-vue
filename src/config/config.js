let baseUrl = `http://${location.hostname}:8080`

let config = {
    urls: {
        events: `${baseUrl}/api/events`,
        event(id) { return `${baseUrl}/api/events/${id}` },
        people: `${baseUrl}/api/people`,
        person(id) { return `${baseUrl}/api/people/${id}` },
        login: `${baseUrl}/oauth2/login`,
        attendancePeople(id) { return `${baseUrl}/api/attendance/people/${id}` },
        attendanceEvents(id) { return `${baseUrl}/api/attendance/events/${id}` },
    },
    webcam: {
        width: 600, // 4
        height: 600, // 3
        image_format: "jpeg",
        jpeg_quality: 70,
    },
    localStorage: {
        dataToken: 'data-token',
        gofaceToken: 'goface-token'
    }
}

export default config