import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';

function EditDepModal(props) {
	const [depname, setDepartmentName] = useState(props.depname);
	const apiUrl = 'http://localhost:8000/';

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const depname = formData.get("DepartmentName");

		fetch(apiUrl + 'department/', {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				DepartmentId: props.depid,
				DepartmentName: event.target.DepartmentName.value
			})
		})
			.then(res => res.json())
			.then((result) => {
				alert(result);			
			})
			.catch((error) => {
				alert('Failed');
			});
	};

	return (
		<Container>
			<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Edit Department</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="DepartmentId">
									<Form.Label>DepartmentId</Form.Label>
									<Form.Control type="text" name="DepartmentId" required disabled defaultValue={props.depid} placeholder="DepartmentId" />
								</Form.Group>

								<Form.Group controlId="DepartmentName">
									<Form.Label>DepartmentName</Form.Label>
									<Form.Control type="text" name="DepartmentName" required value={depname} onChange={(e) => setDepartmentName(e.target.value)} placeholder="DepartmentName" />
								</Form.Group>

								<Form.Group>
									<Button variant="primary" type="submit">
										Update Department
									</Button>
								</Form.Group>
							</Form>
						</Col>
					</Row>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="danger" onClick={props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
}

export default EditDepModal;
