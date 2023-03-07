
const addCustomerForm = document.querySelector('.form-create');
const editCustomerForm = document.querySelector('.form-edit');
const depCustomerForm = document.querySelector('.form-dep');
const wdCustomerForm = document.querySelector('.form-wd');
const url = 'http://localhost:3300/customers';
let id = "";
let newBalance = "";
fetch(url)
    .then(res => res.json())
    .then(data => {
        data.forEach(customer => {
            renderCustomer(customer);
        });
    });

const tableCustomer = document.querySelector('#table-customers');
const renderCustomer = (customer) => {
    const output = `
                     <tr data-id = '${customer.id}'>
                        <td>${customer.id}</td>
                        <td>${customer.fullName}</td>
                        <td>${customer.email}</td>
                        <td>${customer.phone}</td>
                        <td>${customer.address}</td>
                        <td>${customer.balance}</td>
                        <td>
                            <button class="btn-edit btn btn-outline-secondary" data-toggle="modal" data-target="#myEdit" >
                                Edit
                            </button>
                        </td>
                        <td>
                            <button class="btn-dep btn btn-outline-success" data-toggle="modal" data-target="#myDep">
                                Deposit
                            </button>
                        </td>
                        <td>
                            <button class="btn-wd btn btn-outline-warning" data-toggle="modal" data-target="#myWd">
                                Withdraw
                            </button>
                        </td>
                        <td>
                            <button class="btn-del btn btn-outline-warning">
                                Delete
                            </button>
                        </td>

                    </tr>
    `;
    tableCustomer.insertAdjacentHTML("beforeend", output);
    // delete
    const btndep = document.querySelector(`[data-id='${customer.id}'] .btn-dep`);
    const btndel = document.querySelector(`[data-id='${customer.id}'] .btn-del`);
    const btnedit = document.querySelector(`[data-id='${customer.id}'] .btn-edit`);
    const btnwd = document.querySelector(`[data-id='${customer.id}'] .btn-wd`);
    btnwd.addEventListener('click', (e) => {
        e.preventDefault();
        id = customer.id;
        newBalance = customer.balance;
        wdCustomerForm.fullname.value = customer.fullName;
        wdCustomerForm.email.value = customer.email;
        wdCustomerForm.phone.value = customer.phone;
        wdCustomerForm.address.value = customer.address;
        wdCustomerForm.balance.value = customer.balance;
    });
    btndep.addEventListener('click', (e) => {
        e.preventDefault();
        id = customer.id;
        newBalance = customer.balance;
        depCustomerForm.fullname.value = customer.fullName;
        depCustomerForm.email.value = customer.email;
        depCustomerForm.phone.value = customer.phone;
        depCustomerForm.address.value = customer.address;
        depCustomerForm.balance.value = customer.balance;
    });
    btnedit.addEventListener('click', (e) => {
        e.preventDefault();
        id = customer.id;
        editCustomerForm.fullname.value = customer.fullName;
        editCustomerForm.email.value = customer.email;
        editCustomerForm.phone.value = customer.phone;
        editCustomerForm.address.value = customer.address;
    });
    btndel.addEventListener('click', () => {
        fetch(`${url}/${customer.id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload());
    });
}

addCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: addCustomerForm.fullname.value,
            email: addCustomerForm.email.value,
            phone: addCustomerForm.phone.value,
            address: addCustomerForm.address.value,
            balance: 0
        })
    })
        .then(res => res.json())
        .then(data => {
            // const dataArr = [];
            // dataArr.push(data);
            renderCustomer(data);
        })
    addCustomerForm.fullname.value = '';
    addCustomerForm.email.value = '';
    addCustomerForm.phone.value = '';
    addCustomerForm.address.value = '';
});
editCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fullName: editCustomerForm.fullname.value,
            email: editCustomerForm.email.value,
            phone: editCustomerForm.phone.value,
            address: editCustomerForm.address.value,
            balance: 0
        })
    })
        .then(res => res.json())
        .then(() => location.reload())
    editCustomerForm.fullname.value = '';
    editCustomerForm.email.value = '';
    editCustomerForm.phone.value = '';
    editCustomerForm.address.value = '';
});
depCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newBalance = Number(newBalance) + Number(depCustomerForm.deposit.value);
    fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            balance: newBalance
        })
    })
        .then(res => res.json())
        .then(() => location.reload())
    depCustomerForm.balance.value = '';
})
wdCustomerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newBalance = Number(newBalance) - Number(wdCustomerForm.withdraw.value);
    if (newBalance >= 0) {
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                balance: newBalance
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
        depCustomerForm.balance.value = '';
    }

})




