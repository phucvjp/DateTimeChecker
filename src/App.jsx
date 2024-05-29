import { Button, Modal } from 'react-bootstrap';
import logo from './image/logo.png';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const day = document.getElementById('day');
    const month = document.getElementById('month');
    const year = document.getElementById('year');
    if (day && month && year) {
      day.addEventListener('input', () => {
        setDay(day.value);
      });
      month.addEventListener('input', () => {
        setMonth(month.value);
      });
      year.addEventListener('input', () => {
        setYear(year.value);
      });
    }
  }, [day, month, year]);

  const isLeapYear = (year) => {
    if (year % 4 == 0) {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  };

  const isInvalidDate = (day, month, year) => {
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
      return true;
    }
    else if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) {
      return true;
    }
    if (isLeapYear(year)) {
      if (month == 2 && day > 29) {
        return true;
      }
    } else {
      if (month == 2 && day > 28) {
        return true;
      }
    }


    return false;
  };

  function CheckDate(props) {
    if (!parseInt(day)) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter absolute">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            Input data for Day is not a number
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else if (!parseInt(month)) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter absolute">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            Input data for Month is not a number
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else if (!parseInt(year)) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter absolute">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            Input data for Year is not a number
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else if (month > 12 || month < 1) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter absolute">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
          Input data for Month is out of range!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else if (day > 31 || day < 1) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter absolute">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            Input data for Day is out of range!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else if (year > 3000 || year < 1000) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter absolute">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
          Input data for Year is out of range!
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else if (isInvalidDate(day, month, year)) {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Error
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            Invalid Date
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Success
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="grid-example">
            Valid Date
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
  };

  const onClickCheck = () => {
    setModalShow(true);
  };

  return (
    <div className='w-screen place-content-center '>
      <div className='w-fit  mx-auto border border-red-400 p-3'>
        <img src={logo} alt="Screenshot" className='top-0 left-0 ' />
        <h1 className="text-4xl text-center text-blue-600">Date Time Checker</h1>
        <form className=" mx-auto">
          <table className=" mx-auto">
            <tbody>
              <tr>
                <td className=" px-4 py-2">Day</td>
                <td className=" px-4 py-2"><input type='text' id='day' className='border' /></td>
              </tr>
              <tr>
                <td className=" px-4 py-2">Month</td>
                <td className=" px-4 py-2"><input type='text' id='month' className='border' /></td>
              </tr>
              <tr>
                <td className=" px-4 py-2">Year</td>
                <td className=" px-4 py-2"><input type='text' id='year' className='border' /></td>
              </tr>
            </tbody>
          </table>
          <div className='text-center w-full'>
            <input type='reset' value='Clear' id={"clear"} className="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded" />
            <button type='button' onClick={onClickCheck} className="mx-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Check</button>
          </div>
        </form>
        <CheckDate show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  )
}