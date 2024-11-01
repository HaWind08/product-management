// Permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions) {
    const buttonSubmit = document.querySelector("[button-submit]");

    buttonSubmit.addEventListener("click", () => {
        let permissions = [];

        const rows = tablePermissions.querySelectorAll("[data-name]");
        rows.forEach(row => {
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");

            if (name === "id") {
                inputs.forEach(input => {
                    const id = input.value;
                    permissions.push({
                        id: id,
                        permissions: []
                    });
                });
            } else {
                inputs.forEach((input, index) => {
                    const checked = input.checked;
                    if (checked) {
                        permissions[index].permissions.push(name); //permission thứ 2 là key
                    };
                })
            }
        });

        // console.log(permissions);
        if (permissions.length > 0) { // gửi DL sang Backend
            const formChangePermissions = document.querySelector("#form-change-permissions");
            const inputPermissions = document.querySelector("input[name='permissions']");
            inputPermissions.value = JSON.stringify(permissions); // chuyển thành chuỗi JSON
            formChangePermissions.submit();
        };
    });
}
// End Permissions

// permissions data default
const dataRecords = document.querySelector("[data-records]");
if (dataRecords) {
    const records = JSON.parse(dataRecords.getAttribute("data-records")); // chuyển thành mảng
    const tablePermissions = document.querySelector("[table-permissions]");
    // console.log(records);

    records.forEach((record, index) => {
        const permissions = record.permissions;

        console.log(permissions);

        permissions.forEach(permission => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];

            input.checked = true;
        });
    });
}

// End permissions data default