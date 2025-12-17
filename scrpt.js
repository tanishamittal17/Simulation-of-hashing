const size = 10;
let table = new Array(size).fill(null);

function renderTable(highlights = {}) {
    const container = document.getElementById("hashTable");
    container.innerHTML = "";

    table.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.className = "cell";

        if (highlights.probe === index) cell.classList.add("probe-highlight");
        if (highlights.insert === index) cell.classList.add("insert-highlight");

        cell.textContent = value !== null ? value : "-";
        container.appendChild(cell);
    });
}

async function insertValue() {
    let value = document.getElementById("valueInput").value;
    if (value === "") return alert("Enter a value!");

    value = parseInt(value);
    let index = value % size;

    for (let i = 0; i < size; i++) {
        let probeIndex = (index + i) % size;

        renderTable({ probe: probeIndex });
        await new Promise(res => setTimeout(res, 400));

        if (table[probeIndex] === null) {
            table[probeIndex] = value;

            renderTable({ insert: probeIndex });
            await new Promise(res => setTimeout(res, 400));

            renderTable();
            return;
        }
    }

    alert("Hash table is full!");
}

function resetTable() {
    table = new Array(size).fill(null);
    renderTable();
}

// First load
renderTable();
