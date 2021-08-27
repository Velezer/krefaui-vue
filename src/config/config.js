let baseUrl = `http://${location.hostname}:8080`
let faceUrl = `http://${location.hostname}:8000`

let config = {
    urls: {
        events: `${baseUrl}/api/events`,
        event(id) { return `${baseUrl}/api/events/${id}` },
        people: `${baseUrl}/api/people`,
        person(id) { return `${baseUrl}/api/people/${id}` },
        dataLogin: `${baseUrl}/oauth2/login`,

        attendancehadir: `${baseUrl}/api/attendance/hadir`,
        attendancePeople(id) { return `${baseUrl}/api/attendance/people/${id}` },
        attendanceEvents(id) { return `${baseUrl}/api/attendance/events/${id}` },
        deleteAttendance(idEvents,idPeople) { return `${baseUrl}/api/attendance/${idEvents}/${idPeople}` },

        allFace: `${faceUrl}/api/face`,
        findFace: `${faceUrl}/api/face/find`,
        registerFace: `${faceUrl}/api/face/register`,
        deleteFace(id) { return `${faceUrl}/api/face/${id}` },
        jwtLogin: `${faceUrl}/jwt/login`,
        // jwtRegister: `${faceUrl}/jwt/register`,
    },
    webcam: {
        width: 600, // 4
        height: 450, // 3
        image_format: "jpeg",
        jpeg_quality: 70,
    },
    localStorage: {
        dataToken: 'data-token',
        gofaceToken: 'goface-token'
    }
}

export default config