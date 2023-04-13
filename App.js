import React, { useState } from "react"


const ComponentName = props => {
  const [users, setUsers] = useState([
    {
      name: "Mario",
      surname: "Rossi",
      username: "mario.rossi",
      email: "mario.rossi@email.com",
      phone: "1234567890",
      address: "Via Roma 1",
      cap: "12345",
      city: "Milan",
      province: "MI",
      state: "Italia"
    },
    {
      name: "Luigi",
      surname: "Verdi",
      username: "luigi.verdi",
      email: "luigi.verdi@email.com",
      phone: "1234567890",
      address: "Via Roma 1",
      cap: "12345",
      city: "Roma",
      province: "RM",
      state: "Italia"
    },
    {
      name: "Giovanni",
      surname: "Bianchi",
      username: "giovanni.bianchi",
      email: "giovanni.bianchi@email.com",
      phone: "1234567890",
      address: "Via Roma 1",
      cap: "12345",
      city: "Monza",
      province: "MI",
      state: "Italia"
    }
  ])

  // Make a copy of main object for working on
  const [sortedUsers, setSortedUsers] = useState(users)
  
  // Set up object for managing filters
  const [filters, setFilters] = useState({
    city: null,
    province: null,
    state: null
  })

  // Sorting function
  const handleSorting = e => {
    let sorter = e.target.dataset.key
    // Use either numerical or alphabetical sorts for different field types
    setSortedUsers([...users].sort((a, b) => (a[sorter] < b[sorter] ? -1 : 1)));
  }

  // Filtering function
  const handleFilter = e => {

    // Bail if no value set. Shouldn't be possible though
    if(!e.target.value) return

    // Create local copies of states for mutation
    let newFilters = {...filters}
    let newUsers = [...users]

    // If we pass in "all" from the dom, just reset object value at that key
    // This isn't a very elegant way of doing it, but it works nicely
    if(e.target.value !== 'all') {
      newFilters = {...filters, [e.target.name]: e.target.value}
    } else {
      newFilters[e.target.name] = null
    }
    
    // Using a for...in loop to run through all the object keys in the filters obj.
    // By doing it this way, we can add extra filters in future more easily
    newUsers = users.filter(user => {
      for (let key in newFilters) {
        if (newFilters[key] === null) continue
        if (user[key] !== newFilters[key]) return false
      }
      return true
    })

    // When we're happy with local objects, update them in state
    setFilters(newFilters)
    setSortedUsers(newUsers)

  }

  

    
  // In the JSX, I made some minor changes: checkboxes become selects; htmlFor labels were wrong and lastly
  // I added some data-set attributes to the table headers to simplify filtering. No styling - sorry; had it 
  // been a whole app I was given, I'd have added styles/classes.
  return (
    <>
      <div className="filters">
        <div className="filter">
          <label htmlFor="city">Città</label>
          <select name="city" id="city" onClick={handleFilter} >
          <option value="all">Select a city</option>
          {Array.from(new Set(users.map(obj => obj.city))).map((city, index) => {
            return <option key={index} value={city}>{city}</option>
          })}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="province">Provincia</label>
          <select name="province" id="province" onClick={handleFilter}>
            <option value="all">Select a province</option>
          {Array.from(new Set(users.map(obj => obj.province))).map((prov, index) => {
            return <option key={index} value={prov}>{prov}</option>
          })}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="state">Stato</label>
          <select name="state" id="state" onClick={handleFilter}>
          <option value="all">Select a state</option>
          {Array.from(new Set(users.map(obj => obj.state))).map((state, index) => {
            return <option key={index} value={state}>{state}</option>
          })}
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th data-key="name" onClick={handleSorting}>Nome</th>
            <th data-key="surname" onClick={handleSorting}>Cognome</th>
            <th data-key="username" onClick={handleSorting}>Username</th>
            <th data-key="email" onClick={handleSorting}>Email</th>
            <th data-key="phone" onClick={handleSorting}>Telefono</th>
            <th data-key="address" onClick={handleSorting}>Indirizzo</th>
            <th data-key="cap" onClick={handleSorting}>Cap</th>
            <th data-key="city" onClick={handleSorting}>Città</th>
            <th data-key="province" onClick={handleSorting}>Provincia</th>
            <th data-key="state" onClick={handleSorting}>Stato</th>
          </tr>
        </thead>

        <tbody>
          {Boolean(sortedUsers.length) &&
            sortedUsers.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.cap}</td>
                <td>{item.city}</td>
                <td>{item.province}</td>
                <td>{item.state}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default ComponentName