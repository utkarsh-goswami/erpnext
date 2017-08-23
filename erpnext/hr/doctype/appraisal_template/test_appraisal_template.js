QUnit.module('hr');

QUnit.test("Test: Appraisal Template [HR]", function (assert) {
	assert.expect(2);
	let done = assert.async();

	frappe.run_serially([
		// Job Opening creation
		() => {
			frappe.tests.make('Appraisal Template', [
				{ kra_title: 'Test Appraisal 3'},
				{ description: 'This is just a test'},
				{ goals: [
					[
						{ kra: 'Design'},
						{ per_weightage: 50}
					],
					[
						{ kra: 'Code creation'},
						{ per_weightage: 50}
					]
				]},
			]);
		},
		() => frappe.timeout(4),
		() => frappe.set_route('List','Appraisal Template','List'),
		() => frappe.timeout(4),
		() => {
			assert.ok(cur_list.data.length==4, 'Appraisal Template created successfully');
			assert.equal('Test Appraisal 3',cur_list.data[0].name, 'Appraisal name correctly set');
		},
		() => done()
	]);
});

