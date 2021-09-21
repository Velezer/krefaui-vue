// let dataUrl = `http://${location.hostname}:8080`
// let faceUrl = `http://${location.hostname}:8000`
let dataUrl = `https://krefa-data-api.herokuapp.com`
let faceUrl = `http://${location.hostname}`
// let faceUrl = `https://goface-api-echo-velezer.herokuapp.com/`

let config = {
    baseImgUrl: dataUrl,
    urls: {
        events: `${dataUrl}/api/events`,
        event(id) { return `${dataUrl}/api/events/${id}` },
        people: `${dataUrl}/api/people`,
        person(id) { return `${dataUrl}/api/people/${id}` },
        dataLogin: `${dataUrl}/oauth2/login`,

        attendancehadir: `${dataUrl}/api/attendance/hadir`,
        attendancePeople(id) { return `${dataUrl}/api/attendance/people/${id}` },
        attendanceEvents(id) { return `${dataUrl}/api/attendance/events/${id}` },
        deleteAttendance(idEvents, idPeople) { return `${dataUrl}/api/attendance/${idEvents}/${idPeople}` },

        allFace: `${faceUrl}/api/face`,
        findFace: `${faceUrl}/api/face/find`,
        registerFace: `${faceUrl}/api/face/register`,
        // deleteFace(id) { return `${faceUrl}/api/face/${id}` },
        face(id) { return `${faceUrl}/api/face/${id}` },
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