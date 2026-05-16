'use client';

import { ChangeEvent, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import css from './BookingForm.module.css';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import { enGB } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { createBookingRequest } from '@/lib/api/clientApi';

registerLocale('enGB', enGB);

interface BookingFormProps {
  carId: string;
}

interface BookingFormValues {
  name: string;
  email: string;
  comment: string;
}

const BookingFormSchema = Yup.object({
  name: Yup.string().trim().min(2).max(50).required('Name is required'),
  email: Yup.string().trim().email('Enter a valid email').required('Email is required'),
  date: Yup.date().required('Booking date is required'),
  comment: Yup.string().trim().max(500).required('Leave a comment please.'),
});

const initialValues: BookingFormValues = {
  name: '',
  email: '',
  comment: '',
};

function BookingForm({ carId }: BookingFormProps) {
  const [values, setValues] = useState(initialValues);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formValues = { ...values, date: selectedDate };

    try {
      setErrors({});
      await BookingFormSchema.validate(formValues, { abortEarly: false });

      setIsSubmitting(true);

      await createBookingRequest(carId, {
        name: values.name,
        email: values.email,
        comment: values.comment,
        // dateFrom: selectedDate?.toISOString() ?? '',
        // dateTo: selectedDate?.toISOString() ?? '',
      });

      toast.success(`Booking request sent for ${selectedDate?.toLocaleDateString('uk-UA')}`);

      setValues(initialValues);
      setSelectedDate(null);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const formErrors: Record<string, string> = {};
        err.inner.forEach(error => {
          if (error.path) formErrors[error.path] = error.message;
        });
        setErrors(formErrors);
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={css.booking}>
        <h2 className={css.title}>Book your car now</h2>
         <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name*"
          className={css.input}
        />
        {errors.name && <span className={css.error}>{errors.name}</span>}

        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email*"
          className={css.input}
        />
        {errors.email && <span className={css.error}>{errors.email}</span>}

        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => setSelectedDate(date)}
          placeholderText="Booking date*"
          className={css.input}
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          locale="enGB"
        />
        {errors.date && <span className={css.error}>{errors.date}</span>}

        <textarea
          name="comment"
          value={values.comment}
          onChange={handleChange}
          placeholder="Comment*"
          className={css.textarea}
          rows={3}
        />
        {errors.comment && <span className={css.error}>{errors.comment}</span>}

        <button type="submit" className={css.button} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
}

export default BookingForm;