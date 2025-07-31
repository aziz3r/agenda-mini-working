// Dashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExamens } from '../../features/examens/examenSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { parseISO, format, getDay, getHours } from 'date-fns';
import { useSidebar } from '../../context/SidebarContext';
import Sidebar from '../../components/SideBar/SideBar'; // ✅ Assure-toi que ce chemin est correct
import './dashboard.css';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const hours = Array.from({ length: 18 }, (_, i) => `${i + 7}:00`); // de 7h à 24h

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { examens } = useSelector((state: RootState) => state.examens);
  const { isOpen: isSidebarOpen } = useSidebar();

  useEffect(() => {
    dispatch(fetchExamens());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="grid-wrapper">
        <div className="grid-inner">
          <div className="header-row">
            <div></div>
            {days.map((day, idx) => (
              <div key={idx} className="header-cell">{day}</div>
            ))}
          </div>

          {hours.map((hour, hIdx) => (
            <div key={hIdx} className="time-row">
              <div className="time-cell">{hour}</div>
              {days.map((_, dIdx) => {
                const matchingExam = examens.find((exam) => {
                  const date = parseISO(exam.date);
                  return getDay(date) === dIdx && getHours(date) === hIdx + 7;
                });

                return (
                  <div key={dIdx} className="grid-cell">
                    {matchingExam && (
                      <div className="exam-block">
                        {matchingExam.nom}
                        <br />
                        {format(new Date(matchingExam.date), 'HH:mm')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {isSidebarOpen && <Sidebar />} {/* ✅ Affichage conditionnel de la Sidebar */}
    </div>
  );
};

export default Dashboard;

