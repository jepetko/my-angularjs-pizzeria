package com.ng.rest.company;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.fluttercode.datafactory.impl.DataFactory;

public enum EmployeeDao {
	
	instance;	
	private List<Employee> list = new ArrayList<Employee>();
	
	private EmployeeDao() {		
		Random random = new Random();
		DataFactory df = new DataFactory();
		for(int i=0; i<50; i++) {
			Department department = Department.values()[random.nextInt(3)];
			int ranking = random.nextInt(100);
			list.add(new Employee(i+1, df.getFirstName(), df.getLastName(), department, ranking));
		}
	}
	
	public List<Employee> getModel() {
		return list;
	}
}
