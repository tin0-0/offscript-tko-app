'use client';
import { useFormState } from 'react-dom';
import { login } from '../admin/actions';
export default function Login() {
  const [st, act] = useFormState(login, null);
  return (<section className="w" style={{ maxWidth:460 }}><h1 className="ch">Admin login</h1>
    <form className="card" action={act}><label>Email</label><input name="email" type="email" required autoComplete="username" />
      <label>Password</label><input name="password" type="password" required autoComplete="current-password" />
      {st?.msg && <p style={{ color:'#e6c04a' }}>{st.msg}</p>}<p><button className="b">Log in</button></p></form></section>);
}
