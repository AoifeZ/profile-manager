import React, { useState } from "react";
import { Modal, Button, Row, Col, Form, Container } from 'react-bootstrap';

function AddDepModal(props) {
	const [deps, setDeps] = useState([]);
	const apiUrl = 'http://localhost:8000/';

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const departmentName = formData.get("DepartmentName");

		fetch(apiUrl + 'department/', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				DepartmentId: null,
				DepartmentName: departmentName
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
					<Modal.Title id="contained-modal-title-vcenter">
						Add Department
						</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form onSubmit={handleSubmit}>
								
								<Form.Group controlId="DepartmentName">
									<Form.Label>DepartmentName</Form.Label>
									<Form.Control type="text" name="DepartmentName" required placeholder="DepartmentName" />
								</Form.Group>

								<Form.Group>
									<Button variant="primary" type="submit">
										Add Department
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

export default AddDepModal;
