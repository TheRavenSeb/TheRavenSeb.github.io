// Replace with your Netlify function URL
const NETLIFY_FUNCTION_URL = 'https://reaper-pirs.netlify.app/.netlify/functions/submit-report';

const OFFICERS = [
    {"name": "O-11 Grim Reaper", "id": "1193393168247422989"},
    {"name": "O-10 Jax", "id": "1023303156676972554"},
    {"name": "O-10 Danny", "id": "1204222144834175016"},
    {"name": "O-10 German", "id": "1077077242468909177"},
    {"name": "O-9 Inky", "id": "864207724992659506"},
    {"name": "O-9 Charlie", "id": "1159909532839989350"},
    {"name": "O-8 Raptor", "id": "1282765927271895193"},
    {"name": "E-12 Dutch", "id": "718881205944189038"},
    {"name": "E-2 Ethan", "id": "1267667948844220479"},
    {"name": "E-1 FreakFinder", "id": "596814048956383239"},
    {"name": "E-0 Cold", "id": "1304557564511653973"},
    {"name": "E-0 Carson", "id": "1217266779676610732"},
    {"name": "E-0 Joseph", "id": "747170260800634891"},
    {"name": "E-0 Ryder", "id": "942476009230446603"}
];
const TRAINERS = [
    {"name": "T-0 Raptor", "id": "1282765927271895193"},
    {"name": "T-0 Inky", "id": "864207724992659506"},
    {"name": "T-0 Charlie", "id": "1159909532839989350"},
    {"name": "T-0 German", "id": "1077077242468909177"},
    {"name": "T-0 Jax", "id": "1023303156676972554"},
    {"name": "T-0 Danny", "id": "1204222144834175016"},
    {"name": "T-0 Grim Reaper", "id": "1193393168247422989"},
    {"name": "T-0 Dutch", "id": "718881205944189038"},
    {"name": "T-0 Ethan", "id": "1267667948844220479"},
    {"name": "T-0 FreakFinder", "id": "596814048956383239"},
    {"name": "T-0 Cold", "id": "1304557564511653973"},
    {"name": "T-0 Carson", "id": "1217266779676610732"},
    {"name": "T-0 Joseph", "id": "747170260800634891"},
    {"name": "T-0 Ryder", "id": "942476009230446603"},
    {"name": "T-0 Midnight", "id": "1240864486131503157"},
];

// Load officers into dropdown
function loadOfficers() {
    const select = document.getElementById('officerSelect');
    const plaintiffSelect = document.getElementById('courtPlaintiffSelect');
    const defendantSelect = document.getElementById('preferredDefendantSelect');
    
    // Clear existing options
    select.innerHTML = ''; // Clear previous options
    plaintiffSelect.innerHTML = ''; // Clear previous options
    defendantSelect.innerHTML = ''; // Clear previous options

    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select an Officer --';
    select.appendChild(defaultOption);
    plaintiffSelect.appendChild(defaultOption.cloneNode(true)); // Add same default option to plaintiff select
    defendantSelect.appendChild(defaultOption.cloneNode(true)); // Add same default option to defendant select

    OFFICERS.forEach(officer => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ id: officer.id, name: officer.name });
        option.textContent = officer.name;
        select.appendChild(option);
        
        // Add to court plaintiff select
        const plaintiffOption = document.createElement('option');
        plaintiffOption.value = JSON.stringify({ id: officer.id, name: officer.name });
        plaintiffOption.textContent = officer.name;
        plaintiffSelect.appendChild(plaintiffOption);
        
        // Add to preferred defendant select if officer name starts with 'O'
        if (officer.name.startsWith('O')) {
            const defendantOption = document.createElement('option');
            defendantOption.value = JSON.stringify({ id: officer.id, name: officer.name });
            defendantOption.textContent = officer.name;
            defendantSelect.appendChild(defendantOption);
        }
        
    });
    return console.log(`Loaded ${OFFICERS.length} officers into dropdown`);
}
// load trainers into dropdown
function loadTrainers() {
    const select = document.getElementById('TrainerSelect');
   
    
    // Clear existing options
    select.innerHTML = ''; // Clear previous options
    

    // Add a default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a Trainer --';
    select.appendChild(defaultOption);
    

    TRAINERS.forEach(trainer => {
        const option = document.createElement('option');
        option.value = JSON.stringify({ id: trainer.id, name: trainer.name });
        option.textContent = trainer.name;
        select.appendChild(option);
        
        
    });
}


// Handle misconduct type selection
document.getElementById('arrIncidentType').addEventListener('change', function() {
    const otherInput = document.getElementById('arrOtherIncidentType');
    if (this.value === 'other') {
        otherInput.style.display = 'block';
        otherInput.required = true;
    } else {
        otherInput.style.display = 'none';
        otherInput.required = false;
    }
});

// Set up form when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadOfficers()

    loadTrainers();
    
    // Set default datetime to now
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('arrIncidentDate').value = now.toISOString().slice(0, 16);
});



// Handle personnel incident report submission
document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    const officerData = JSON.parse(document.getElementById('officerSelect').value);
    const misconductType = document.getElementById('misconductType').value;
    const otherMisconductType = document.getElementById('otherMisconductType').value;
    
    try {
        // Create Discord embed for personnel incident report
        const embed = {
            title: "═══ PERSONNEL INCIDENT REPORT ═══",
            color: 0x3282B8,
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: "═══ CLASSIFICATION ═══",
                    value: "OFFICIAL USE ONLY",
                    inline: false
                },
                {
                    name: "SUBJECT PERSONNEL",
                    value: `<@${officerData.id}> (${officerData.name})`,
                    inline: false
                },
                {
                    name: "INCIDENT DETAILS",
                    value: `\nType: ${misconductType === 'other' ? otherMisconductType : misconductType}\n` +
                        `Date: ${document.getElementById('incidentDate').value}\n` +
                        `Location: ${document.getElementById('location').value}\n`,
                    inline: false
                }
            ]
        };

        // Add optional fields
        const witnesses = document.getElementById('witnesses').value;
        if (witnesses) {
            embed.fields.push({
                name: "WITNESSES",
                value: `\`\`\`${witnesses}\`\`\``,
                inline: false
            });
        }

        embed.fields.push({
            name: "DETAILED REPORT",
            value: `\`\`\`${document.getElementById('complaint').value}\`\`\``,
            inline: false
        });

        const evidence = document.getElementById('evidence').value;
        if (evidence) {
            embed.fields.push({
                name: "SUPPORTING EVIDENCE",
                value: `\`\`\`${evidence}\`\`\``,
                inline: false
            });
        }

        // Send to Netlify function
        const response = await fetch(NETLIFY_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                embed: embed
            })
        });

        if (response.ok) {
            alert('Report submitted successfully!');
            e.target.reset();
            // Reset datetime to current
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            document.getElementById('incidentDate').value = now.toISOString().slice(0, 16);
            // Reset officer select
            loadOfficers();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to submit report: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error submitting report: ${error.message}`);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Report';
    }
});

// Handle court report submission
document.getElementById('courtForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    const plaintiffData = JSON.parse(document.getElementById('courtPlaintiffSelect').value);
    const preferredDefendantData = JSON.parse(document.getElementById('preferredDefendantSelect').value);
    const courtType = document.getElementById('courtType').value;
    const scheduledCourtTime = document.getElementById('scheduledCourtTime').value;
    
    try {
        // Create Discord embed for court report
        const embed = {
            title: "═══ COURT REPORT ═══",
            color: 0xFF5733,
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: "═══ CLASSIFICATION ═══",
                    value: "OFFICIAL USE ONLY",
                    inline: false
                },
                {
                    name: "PLAINTIFF",
                    value: `<@${plaintiffData.id}> (${plaintiffData.name})`,
                    inline: false
                },
                {
                    name: "PREFERRED DEFENDANT",
                    value: `<@${preferredDefendantData.id}> (${preferredDefendantData.name})`,
                    inline: false
                },
                {
                    name: "COURT TYPE",
                    value: courtType,
                    inline: false
                },
                {
                    name: "SCHEDULED COURT TIME",
                    value: new Date(scheduledCourtTime).toLocaleString(),
                    inline: false
                },
                {
                    name: "INCIDENT DETAILS",
                    value: `\nDate: ${document.getElementById('courtIncidentDate').value}\n` +
                        `Location: ${document.getElementById('courtLocation').value}\n`,
                    inline: false
                }
            ]
        };

        // Add optional fields
        const courtWitnesses = document.getElementById('courtWitnesses').value;
        if (courtWitnesses) {
            embed.fields.push({
                name: "WITNESSES",
                value: `\`\`\`${courtWitnesses}\`\`\``,
                inline: false
            });
        }

        embed.fields.push({
            name: "DETAILED REPORT",
            value: `\`\`\`${document.getElementById('courtDescription').value}\`\`\``,
            inline: false
        });

        // Send to Netlify function
        const response = await fetch(NETLIFY_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                embed: embed
            })
        });

        if (response.ok) {
            alert('Court report submitted successfully!');
            e.target.reset();
            // Reset datetime to current
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            document.getElementById('courtIncidentDate').value = now.toISOString().slice(0, 16);
            // Reset officer select
            loadOfficers();
        } else {
            const errorText = await response.text();
            throw new Error(`Failed to submit court report: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error submitting court report: ${error.message}`);
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Court Report';
    }
});

// arr submition
document.getElementById('arrForm').addEventListener('submit', async (e) => {

    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    const trainerData = JSON.parse(document.getElementById('TrainerSelect').value);
    const misconductType = document.getElementById('arrIncidentType').value;
    const otherMisconductType = document.getElementById('arrOtherIncidentType').value;

    try {

        // Create Discord embed for ARR After action report


        const embed = {
            title: "═══ AFTER ACTION REPORT ═══",
            color: 0x3282B8,
            timestamp: new Date().toISOString(),
            fields: [
                {
                    name: "═══ CLASSIFICATION ═══",
                    value: "OFFICIAL USE ONLY",
                    inline: false
                },
                {
                    name: "SUBJECT TRAINER",
                    value: `<@${trainerData.id}> (${trainerData.name})`,
                    inline: false
                },
                {
                    name: "EVENT DETAILS",
                    value: `\nType: ${misconductType === 'other' ? otherMisconductType : misconductType}\n` +
                        `Date: ${document.getElementById('arrIncidentDate').value}\n` +
                        `Location: ${document.getElementById('arrLocation').value}\n`,
                    inline: false
                }
            ]
        };

        // Add optional fields
        const arrWitnesses = document.getElementById('arrWitnesses').value;
        if (arrWitnesses) {
            embed.fields.push({
                name: "Attendees",
                value: `\`\`\`${arrWitnesses}\`\`\``,
                inline: false
            });
        }

        embed.fields.push({
            name: "DETAILED REPORT",
            value: `\`\`\`${document.getElementById('arrDescription').value}\`\`\``,
            inline: false
        });

        
        //outcome
        const outcome = document.getElementById('Outcome').value;
        if (outcome) {
            embed.fields.push({
                name: "OUTCOME",
                value: `\`\`\`${outcome}\`\`\``,
                inline: false
            });
        }

        // Send to Netlify function
        const response = await fetch(NETLIFY_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                embed: embed
            })
        });

        if (response.ok) {

            alert('After action report submitted successfully!');
            e.target.reset();
            // Reset datetime to current
            const now = new Date();
            now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
            document.getElementById('arrIncidentDate').value = now.toISOString().slice(0, 16);
            // Reset officer select
            loadTrainers();
        }
        else {
            const errorText = await response.text();
            throw new Error(`Failed to submit report: ${errorText}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error submitting report: ${error.message}`);
    }
    finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit Report';
    }

});




// Add this code to handle form switching without reloading the page
document.getElementById('pirsButton').addEventListener('click', function() {
    document.getElementById('complaintFormContainer').style.display = 'block';
    document.getElementById('courtFormContainer').style.display = 'none';
    document.getElementById('arrFormContainer').style.display = 'none';
});

document.getElementById('courtButton').addEventListener('click', function() {
    document.getElementById('complaintFormContainer').style.display = 'none';
    document.getElementById('courtFormContainer').style.display = 'block';
    document.getElementById('arrFormContainer').style.display = 'none';
});

document.getElementById('arrButton').addEventListener('click', function() {
    document.getElementById('complaintFormContainer').style.display = 'none';
    document.getElementById('courtFormContainer').style.display = 'none';
    document.getElementById('arrFormContainer').style.display = 'block';
});