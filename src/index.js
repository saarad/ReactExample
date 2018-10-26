// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Alert } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path



class Student {
    id: number;
    static nextId = 1;

    firstName: string;
    lastName: string;
    email: string;

    constructor(firstName: string, lastName: string, email: string) {
        this.id = Student.nextId++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }//end constructor
}//end class

let students = [
  new Student('Ola', 'Jensen', 'ola.jensen@ntnu.no'),
  new Student('Kari', 'Larsen', 'kari.larsen@ntnu.no'),
  new Student('Kim Roger', 'Rogersen', 'kiro@ntnu.no'),
  new Student('Kent', 'Iversen', 'kenti@ntnu.no')
];

class Course{
    title: string;
    code: string;
    students: Student[];

    constructor(title: string, code: string, students: Student[]){
        this.title = title;
        this.code = code;
        this.students = students;
    }//end constructor
}//end class


let courses = [ //hard coding students into courses to have examples
  new Course('Systemutvikling 3', 'TDAT3001', students.map((e,i) => {
    if(i===0 || i===1) return e;

    console.log(e);
  })),
  new Course('Sikkerhet i programvare og nettverk', 'TDAT3002', students.map((e,i) =>{
    if(i===0 || i===1) return e;
    console.log(e);
  })),
  new Course('Matematikk og fysikk valgfag', 'TDAT3004', students.map((e,i) => {
      if(i===2 || i===3) return e;
      console.log(e);
  })),
  new Course('Grunnleggende kurs i C++', 'TDAT3005', students.map((e,i) =>{
      if(i===2 || i===3) return e;
      console.log(e);
  }))
];


class Menu extends Component {
  render() {
    return (
      <div className="card">
        <div className="card text-center" style={{color: 'white', background: 'black' }}>
            <h3 className="card-header"> React with bootstrap</h3>

          <div className="card-body ">
            <nav className="navbar navbar-collapse navbar-light bg-light">
              <NavLink activeStyle={{ color: 'gray' }} style={{color: 'black'}} exact to="/">
                  <h3>Home</h3>
              </NavLink>

              <NavLink activeStyle={{ color: 'gray' }} style={{color:'black'}} to="/students">
                  <h4>Students</h4>
              </NavLink>

              <NavLink activeStyle={{ color: 'gray' }} style={{color: 'black'}} to="/courses">
                  <h4>Courses</h4>
              </NavLink>
                <NavLink activeStyle={{color: 'gray'}} style={{color: 'black'}} to='/studentsAdd'>
                    <h6>Add students</h6>
                </NavLink>
                <NavLink activeStyle={{color: 'gray'}} style={{color: 'black'}} to='/coursesAdd'>
                    <h6>Add courses</h6>
                </NavLink>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

class Home extends Component {
  render() {
    return(
        <div className="card">
            <h2 className="card-title text-center"> React Example </h2>
            <div className="text-center card-body"> React example with static pages </div>
          <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
        </div>
    )
  }
}

class StudentList extends Component {
  render() {
    return (
      <div className="card mb-3">
        <ul className="list-group list-group-flush">
          {students.map(e => (
            <li key={e.email} className="list-group-item text-center">
              <NavLink activeStyle={{ color: 'black' }} exact to={'/students/' + e.email}>
                {e.firstName} {e.lastName}
              </NavLink>{' '}
              <NavLink activeStyle={{color: 'black'}} style = {{color: 'red'}} to={'/students/edit/' + e.email}>
                  Edit student
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

class StudentDetails extends Component<{ match: { params: { email: string } } }> {
  render() {
    console.log(this.props.match.params.email);
    let student = students.find(e => e.email === this.props.match.params.email);
    if (!student) {
        Alert.danger('Student not found: ' + this.props.match.params.email);
        return null; // Return empty object (nothing to render)
    }
    let coursesAttended = [];
    courses.map(e => e.students.map(f => {
      if(f !== undefined) {
          if (f.email === student.email) coursesAttended.push(e);
      }//end condition
    }));


    console.log(coursesAttended);
    return (
      <div>
        <div className="card">
          <h2 className="card-header">Details </h2>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">First name: {student.firstName}</li>
            <li className="list-group-item">Last name: {student.lastName}</li>
            <li className="list-group-item">Email: {student.email}</li>
          </ul>
        </div>
        <div className="card">
          <h2 className="card-header">Courses </h2>
          <ul className="list-group list-group-flush">
              {
                coursesAttended.map(e =>
                    <li key={e.code} className="list-group-item">{e.title}</li> )
              }
          </ul>
            <button className="btn-block" style={{background:'red'}}>
            <NavLink style={{color: 'white'}} to={'/studentsDelete/' + this.props.match.params.email}>
                <h3 className="text-center">Delete this student</h3>
            </NavLink>
            </button>
        </div>
        <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
      </div>
    );
  }//end render
}//end class

class StudentEdit extends Component<{match: {params: {email: string}}}>{
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    render(){
        console.log(this.props.match.params.email);
        return(
            <form>
                <ul>
                    <li className="list-group-item">
                        First name: {' '}
                        <input type ="text" value={this.firstName}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.firstName = event.target.value)} className="list-group-item-action"/>
                    </li>
                    <li className="list-group-item">
                        Last name: {' '}
                        <input type="text" value={this.lastName}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) =>
                                   (this.lastName = event.target.value)} className="list-group-item-action"/>
                    </li>
                    <li className="list-group-item">
                        Email: {' '}
                        <input type="text" value={this.email}
                        />
                    </li>
                </ul>
                <div className="text-center card-header">
                <button type="button" className="btn-primary" onClick={this.save}>
                    Save
                </button>
                </div>
                <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
            </form>
        )
    }//end render

    mounted(){
        let student = students.find(student => student.email === this.props.match.params.email);
        if(!student){
            Alert.danger('Student not found ' + this.props.match.params.emailFind);
            return;
        }//end condition
        this.firstName = student.firstName;
        this.lastName = student.lastName;
        this.email = student.email;
    }//end mounted

    save(){
        let student = students.find(student => student.email===this.props.match.params.email);
        if (!student) {
            Alert.danger('Student not found: ' + this.props.match.params.email);
            return;
        }//end condition
        student.firstName = this.firstName;
        student.lastName = this.lastName;
        student.email = this.email;
        // Go to StudentDetails after successful save
        history.push('/students/' + student.email);
    }//end save
}//end class


class StudentAdd extends Component{
    firstName: string = ' ';
    lastName: string = ' ';
    email: string = ' ';

    render(){
        return(
            <form>
                <ul className="list-group">
                    <li className="list-group-item">
                        First name: {' '}
                        <input className="list-group-item-action"
                        type = "text"
                        value={this.firstName}
                        onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.firstName = event.target.value)}/>
                    </li>
                    <li className="list-group-item">
                        Last name: {' '}
                        <input className="list-group-item-action"
                               type = "text"
                               value={this.lastName}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.lastName = event.target.value)}/>
                    </li>
                    <li className="list-group-item">
                        Email: {' '}
                        <input className="list-group-item-action"
                               type = "text"
                               value={this.email}
                               onChange={(event: SyntheicInputEvent<HTMLInputElement>) => (this.email = event.target.value)}/>
                    </li>
                </ul>
                <button type="button" onClick={this.save}> Save </button>
                <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
            </form>
        )
    }//end render

    save(){
        if(this.firstName !== undefined && this.lastName !== undefined && this.email !== undefined){
            let newStudent: Student = new Student(this.firstName,this.lastName,this.email);
            students.push(newStudent);
            Alert.success('Student with ' + newStudent.email + ' has been added to students');
            history.push('/students');
        }else{
            Alert.danger('You must fill out the form in the given format!');
        }//end condition
    }//end save
}//end class

class StudentDelete extends Component<{match: {params: {email:string}}}>{
    render() {
        return(
            <div className="card">
                <h2 className="card-title">Delete student </h2>
                <div className="card-body">
                    Do you want to delete student with email {this.props.match.params.email}?
                </div>
                <button type="button" onClick={this.save}>Yes</button>
                <button type="button" onClick={this.goBack}>No</button>
            </div>
        )
    }//end render

    save(){
        let student = students.find(student => student.email === this.props.match.params.email); //to avoid bugs
        if(student !== undefined){
            students = students.filter(e => e.email !== student.email);
        }else{
            Alert.danger('Cannot find student');
        }//end condition
        Alert.success('Student with ' + student.email + ' has been deleted');
        history.push('/students');
    }//end save

    goBack(){
        history.push('/students');
    }//end method
}//end class


class CourseList extends Component{
  render(){
    return(
      <div className="card">
        <ul className="list-group list-group-flush">
            {
              courses.map(e => (
                  <li key={e.code} className="list-group-item text-center">
                      <NavLink activeStyle={{color: 'darkblue' }} to={'/courses/' + e.code}>
                          {e.title}
                      </NavLink>{' '}
                      <NavLink activeStyle={{color: 'darkblue'}} style={{color: 'red'}} to={'/courses/edit/' + e.code}>
                          Edit
                      </NavLink>
                  </li>
              ))}
        </ul>
      </div>
    );
  }//end render
}//end class

class CourseDetails extends Component<{ match: { params: { code: string } } } >{
    render(){
      let course = courses.find(e => e.code === this.props.match.params.code);
      if(!course){
        console.error('Course not found');
        return null;
      }//end condition
      console.log(course);
      let studentsOnCourse = [];
      if(course.students !== undefined)course.students.map(e => {
        if(e!==undefined && students.find(f => e.email === f.email))studentsOnCourse.push(e);
      });
      console.log(studentsOnCourse);


      return(
        <div>
          <div className="card">
              <h2 className="card-header">
                  Details
              </h2>

            <ul className="list-group list-group-flush">
              <li className="list-group-item"> Title: {course.title}</li>
              <li className="list-group-item"> Code: {course.code}</li>
            </ul>
          </div>

          <div className="card">
              <h2 className="card-header">Students </h2>
              <ul className="list-group list-group-flush">
                  {
                    studentsOnCourse.map(e =>
                    <li key={e.email} className="list-group-item"> {e.firstName} {e.lastName} </li>
                    )
                   }
              </ul>
              <button className="btn-block" style={{background: 'red'}}>
              <NavLink style={{color: 'white'}} to={'/coursesDelete/' + this.props.match.params.code}>
                  <h3 className="text-center">Delete this course</h3>
              </NavLink>
              </button>
          </div>
            <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
        </div>
      );
    }//end render

}//end class

class CourseEdit extends Component<{match: {params: {code: string}}}>{
    title: string = ' ';
    render(){
        return(
            <form>
                <button type="button" className="btn-dark" onClick={this.addStudents}>
                    Add students to course
                </button>
                <button type="button" className="btn-danger" onClick={this.deleteStudents}>
                    Delete students from this course
                </button>
                <ul>
                    <li className="list-group-item btn-lg"> Title: {' '}
                        <input type="text"
                               value={this.title}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.title = event.target.value)} className="form-control" />
                    </li>
                </ul>

                <div className="text-center card-title">
                <button type="button" className="btn-primary" onClick={this.save}> Save </button>
                </div>

                <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
            </form>
        )
    }//end render

    mounted(){
        let course = courses.find(course => course.code === this.props.match.params.code);
        if (!course) {
            Alert.danger('Course not found: ' + this.props.match.params.code);
            return;
        }//end condition
        this.title = course.title;
    }//end mounted

    save(){
        let course = courses.find(course => course.code === this.props.match.params.code);
        if (!course) {
            Alert.danger('Course not found: ' + this.props.match.params.code);
            return;
        }//end condition
        course.title = this.title;

        history.push('/courses/' + course.code);
    }//end save

    addStudents(){
        history.push('/addStudentsCourse/' + this.props.match.params.code);
    }//end addStudents

    deleteStudents(){
        history.push('/deleteStudentsCourse/' + this.props.match.params.code);
    }//end deleteStudents
}//end class

class CourseAddStudents extends Component<{match: {params: {code: string}}}>{
    email: string = '';
    render(){
        return(
         <form>
            <ul className="list-group">
                <li className="list-group-item btn-lg">
                    Students email: {' '}
                    <input type="text"
                           value={this.email}
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                               (this.email = event.target.value)} className="list-group-item-action" />
                </li>
            </ul>
             <div className=" text-center">
                 <button type="button" className="btn-primary" onClick={this.save}> Save </button>
             </div>
        </form>
            )
    }//end render

    save(){
        let course = courses.find(course => course.code === this.props.match.params.code);
        let student = students.find(student => {
            console.log(student.email);
            console.log(this.email);
           return student.email === this.email;
        });
        console.log(course);
        console.log(student);

        if(student === course.students.find(e =>{ //Check if student is already registered for course
            if(e!==undefined)return e.email === this.email
        })){
            Alert.warning('Student is already registered at this course');
            history.push('/courses/' + this.props.match.params.code);
        }else{ //Add student to course
            if(course  !==undefined && student !== undefined){
                course.students.push(student);
                Alert.success('Student added to course');
                history.push('/courses/' + this.props.match.params.code);
            }else{
                Alert.danger('Could not find student');
            }//end condition
        }//end condition
    }//end save
}//end class

class CourseDeleteStudents extends Component<{match: {params: {code: string}}}>{
    email: string = '';
    render(){
        return(
            <form>
                <ul className="list-group">
                    <li className="list-group-item btn-lg">
                        Students email: {' '}
                        <input type="text"
                               value={this.email}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                                   (this.email = event.target.value)} className="list-group-item-action" />
                    </li>
                </ul>
                <div className=" text-center">
                    <button type="button" className="btn-primary" onClick={this.save}> Save </button>
                </div>
            </form>
        )
    }//end render

    save(){
        let course = courses.find(course => course.code === this.props.match.params.code);
        let student = students.find(student => {
            console.log(student.email);
            console.log(this.email);
            return student.email === this.email;
        });
        console.log(course);
        console.log(student);
        if(course  !==undefined && student !== undefined){
            course.students = course.students.filter(e => {
                if(e!== undefined)return e.email !== this.email
            });
            Alert.success('Student with email ' + this.email + ' removed from course');
            history.push('/courses/' + this.props.match.params.code);
        }else{
            Alert.danger('Could not find student');
        }//end condition
    }//end save
}//end class

class CourseAdd extends Component{
    title: string = '';
    code: string = '';
    studentsForCourse: Student[];

    render(){
        return(
            <form>
                <ul className="list-group">
                    <li className="list-group-item">
                       Title: {' '}
                       <input type="text" className="list-group-item-action"
                       value={this.title}
                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                              (this.title = event.target.value)}
                       />
                    </li>
                    <li className="list-group-item">
                        Code: {' '}
                        <input type="text" className="list-group-item-action"
                               value={this.code}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) =>
                               (this.code = event.target.value)}
                        />
                    </li>
                </ul>
                <button type="button" onClick={this.save}> Save </button>
                <div className="card-footer text-muted" style={{background: 'black'}}>Contact info: iliar@stud.ntnu.no </div>
            </form>
        )
    }//end render

    save(){
        if(this.title !== undefined && this.code !== undefined){
           let newCourse = new Course(this.title,this.code,this.studentsForCourse);
           courses.push(newCourse);
           Alert.success('Course with code ' + newCourse.code + ' has been added to courses');
           history.push('/courses');
        }else{
            Alert.danger('Please fill out the form in the given format');
        }//end condition
    }//end save
}//end class

class CourseDelete extends Component<{match: {params: {code: string}}}>{
    render() {
        return(
            <div className="card">
                <h2 className="card-title">Delete course </h2>
                <div className="card-body">
                    Do you want to delete course with code {this.props.match.params.code}?
                </div>
                <button type="button" onClick={this.save}>Yes</button>
                <button type="button" onClick={this.goBack}>No</button>
            </div>
        )
    }//end render

    save(){
        let course = courses.find(course => course.code === this.props.match.params.code); //to avoid bugs
        if(course !== undefined){
            courses = courses.filter(newCourseList => newCourseList.code !== this.props.match.params.code);
        }else{
            Alert.danger('Cannot find course');
        }//end condition
        Alert.success('Course with code ' + course.code + ' has been deleted');
        history.push('/courses');
    }//end save

    goBack(){
        history.push('/courses');
    }//end method

}//end class


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Alert />
        <Menu />
        <Route exact path="/" component={Home} />
        <Route path="/students" component={StudentList} />
        <Route exact path="/students/:email" component={StudentDetails} />
        <Route path="/courses" component={CourseList} />
        <Route path="/courses/:code" component={CourseDetails} />
        <Route exact path="/students/edit/:email" component={StudentEdit} />
        <Route path="/courses/edit/:code" component={CourseEdit} />
        <Route path="/studentsAdd" component={StudentAdd} />
        <Route path="/coursesAdd" component={CourseAdd} />
        <Route path="/coursesDelete/:code" component={CourseDelete} />
        <Route path="/studentsDelete/:email" component={StudentDelete} />
        <Route path="/addStudentsCourse/:code" component={CourseAddStudents} />
        <Route path="/deleteStudentsCourse/:code" component={CourseDeleteStudents} />
      </div>
    </HashRouter>,
    root
  );




