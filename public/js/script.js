const types = ['humanized', 'personalized', 'instant']
let selectedType = 'humanized';

const refreshTypes = (type) => {
    types.forEach((type) => {
        document.getElementById(type).classList.remove('active')
    })
    document.getElementById(type).classList.add('active')
}

window.addEventListener('click', async (e) => {
    if (e.target.id == "complete-profile") {
        const location = document.getElementById('location').value;
        const duration = document.getElementById('duration').value;
        const bio = document.getElementById('bio').value;
        const data = { location, duration, bio }
        const resp = await fetch('/save-profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const respJSON = await resp.json();
        if (respJSON.success) {
            window.location.href = '/dashboard'
        } else {
            alert(respJSON.error)
        }
    } else if (types.includes(e.target.id)) {
        refreshTypes(e.target.id);
        selectedType = e.target.id;
    } else if (e.target.id == 'create-gig') {
        const location = document.getElementById('location').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const type = selectedType;
        const lookingForText = document.getElementById('lookingForText').value;
        const data = {
            location,
            startDate,
            endDate,
            type,
            lookingForText
        }
        const resp = await fetch('/new-gig', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const respJSON = await resp.json();
        if (respJSON.success) {
            window.location.href = '/posted'
        } else {
            alert(respJSON.error)
        }
    } else if (e.target.id == 'apply-gig') {
        const gigID = document.getElementById('gigId').value;
        const applyNote = document.getElementById('apply-note').value;
        const data = { gigID, applyNote }
        const resp = await fetch('/apply-gig', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const respJSON = await resp.json();
        if (respJSON.success) {
            window.location.href = '/applied'
        } else {
            alert(respJSON.error)
        }
    } else if (e.target.id == 'accept-gig') {
        const responseId = document.getElementById('responseId').value;
        const data = { responseId }
        const resp = await fetch('/accept-gig', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const respJSON = await resp.json();
        if (respJSON.success) {
            window.location.href = '/booked'
        } else {
            alert(respJSON.error)
        }
    } else if (e.target.id == 'decline-gig') {
        const responseId = document.getElementById('responseId').value;
        const data = { responseId }
        const resp = await fetch('/decline-gig', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const respJSON = await resp.json();
        if (respJSON.success) {
            window.location.href = '/posted'
        } else {
            alert(respJSON.error)
        }
    }
})