package com.ng.rest.company;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Employee {
	
	private int id;

	private String name;
	private String surname;
	private Department department;
	private int ranking;
	
	public Employee() {
	
	}	
	
	public Employee(int id, String name, String surname, Department department, int ranking) {
		this.id = id;
		this.name = name;
		this.surname = surname;
		this.department = department;
		this.ranking = ranking;
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public int getRanking() {
		return ranking;
	}

	public void setRanking(int ranking) {
		this.ranking = ranking;
	}
}
