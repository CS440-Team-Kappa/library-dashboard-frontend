import "./CheckedOut.css"

function CheckedOut() {
    return (
        <div className="table-section">

            <table>
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Copies</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Harry Potter</th>
                        <td>JK Rowling</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th scope="row">Lord of the Rings</th>
                        <td>JR Tolkien</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <th scope="row">Calculus 1</th>
                        <td>Jimmy Buffet</td>
                        <td>10</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CheckedOut;