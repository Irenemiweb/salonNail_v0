<x-guest-layout>
 <div class="body_login" id="contentContainer_registerUserGuest">
    <div id="loaderSperaAdministrator" class="loader d-none">
        <div class="spinner"></div>
    </div>
        <div class="validationError_login_register slide-in d-flex justify-content-center position-absolute z-1" style="bottom: 50%; top: 2px; width: 100%;height: fit-content;">
            <x-jet-validation-errors class="mb-3 rounded-0" />
            @if (session('status'))
                <div class="alert alert-success mb-0 rounded-0" role="alert">
                    {{ session('status') }}
                </div>
            @endif
        </div>
        <div class="logo_name_login">
             <h1 class="afri" onclick="return_viewIndex()">{{ config('app.short_name') }}</h1>
        </div>
        <h1 class="naruto-sign1 afri" onclick="return_viewIndex()">{{ config('app.short_name') }}</h1>
        {{-- <x-jet-application-mark class="naruto-sign2"/> --}}
        {{-- <img style="" class="naruto-sign2" src="{{ asset('storage/logo/narutoNails.svg') }}" alt="Manicura pedicura Ourense uñas | {{ config('app.name') }}" /> --}}
        <h1 class="naruto-sign2 afri">Nail Art Studio</h1>
        <div class="darksoul-container">
            <div class="square" style="display: none">
                <h1 class="mt-4 afri" style="font-size: 1.5rem;color:black">REGiSTRO</h1>

            </div>
            <div class=" w-100" style="font-weight: 700">
              <form class="f-col form-container pb-0" action="{{ route('register') }}" method="post" style="font-family: 'gualazonF';font-weight: 500;">
                    @csrf

                    <div style="border-bottom: 1px solid rgba(0, 0, 0, 0.259);">
                        <label>{{ __('Name') }}</label>
                        <input class="darksoul-input small{{ $errors->has('name') ? ' is-invalid' : '' }}"
                            type="text"
                            name="name"
                            value="{{ old('name') }}"
                            required>
                        <x-jet-input-error for="name"></x-jet-input-error>
                    </div>

                    <div class="pb-2" style="border-bottom: 1px solid rgba(0, 0, 0, 0.259);">
                        <label style="display: block">Teléfono</label>
                        <input style="width: 11rem;"
                            id="telefono"
                            class="darksoul-input small{{ $errors->has('telefono') ? ' is-invalid' : '' }}"
                            type="tel"
                            name="telefono"
                            value="{{ old('telefono') }}"
                            required>
                        <x-jet-input-error for="telefono"></x-jet-input-error>
                    </div>

                    <div style="border-bottom: 1px solid rgba(0, 0, 0, 0.259);">
                        <label>Email</label>
                        <input class="darksoul-input small{{ $errors->has('email') ? ' is-invalid' : '' }}"
                            type="email"
                            name="email"
                            value="{{ old('email') }}"
                            required>
                        <x-jet-input-error for="email"></x-jet-input-error>
                    </div>

              <!-- Password -->
                    <div class="darksoul-password form-password position-relative" style="border-bottom: 1px solid rgba(0,0,0,0.259);">
                        <label>{{ __('Password') }}</label>

                        <input id="password" class="darksoul-input small{{ $errors->has('password') ? ' is-invalid' : '' }}"
                            type="password" name="password" required autocomplete="current-password">

                        <button type="button" class="form-password-action position-absolute"
                                onclick="togglePassword('password', this)"
                                aria-label="Toggle password visibility"
                                style="top:50%; right:10px; transform:translateY(-50%); border:none; background:transparent; padding:0; cursor:pointer;">

                            <!-- Ojo abierto (invisible por defecto) -->
                            <span class="form-password-action-icon eye-open d-none">
                                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="color:#ccc;">
                                    <path fill="currentColor" d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/>
                                </svg>
                            </span>

                            <!-- Ojo cerrado (visible por defecto) -->
                            <span class="form-password-action-icon eye-closed">
                                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="color:#ccc;">
                                    <path fill="currentColor" d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/>
                                </svg>
                            </span>
                        </button>

                        <x-jet-input-error for="password"></x-jet-input-error>
                    </div>

                    <!-- Confirm Password -->
                    <div class="darksoul-password form-password position-relative" style="border-bottom: 1px solid rgba(0,0,0,0.259);">
                        <label>{{ __('Confirm Password') }}</label>

                        <input id="password_confirmation" class="darksoul-input small{{ $errors->has('password_confirmation') ? ' is-invalid' : '' }}"
                            type="password" name="password_confirmation" required autocomplete="new-password">

                        <button type="button" class="form-password-action position-absolute"
                                onclick="togglePassword('password_confirmation', this)"
                                aria-label="Toggle password visibility"
                                style="top:50%; right:10px; transform:translateY(-50%); border:none; background:transparent; padding:0; cursor:pointer;">

                            <!-- Ojo abierto (invisible por defecto) -->
                            <span class="form-password-action-icon eye-open d-none">
                                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="color:#ccc;">
                                    <path fill="currentColor" d="M320,256a64,64,0,1,1-64-64A64.07,64.07,0,0,1,320,256Zm189.81,9.42C460.86,364.89,363.6,426.67,256,426.67S51.14,364.89,2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.14,147.11,148.4,85.33,256,85.33s204.86,61.78,253.81,161.25A21.33,21.33,0,0,1,509.81,265.42ZM362.67,256A106.67,106.67,0,1,0,256,362.67,106.79,106.79,0,0,0,362.67,256Z"/>
                                </svg>
                            </span>

                            <!-- Ojo cerrado (visible por defecto) -->
                            <span class="form-password-action-icon eye-closed">
                                <svg width="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="color:#ccc;">
                                    <path fill="currentColor" d="M409.84,132.33l95.91-95.91A21.33,21.33,0,1,0,475.58,6.25L6.25,475.58a21.33,21.33,0,1,0,30.17,30.17L140.77,401.4A275.84,275.84,0,0,0,256,426.67c107.6,0,204.85-61.78,253.81-161.25a21.33,21.33,0,0,0,0-18.83A291,291,0,0,0,409.84,132.33ZM256,362.67a105.78,105.78,0,0,1-58.7-17.8l31.21-31.21A63.29,63.29,0,0,0,256,320a64.07,64.07,0,0,0,64-64,63.28,63.28,0,0,0-6.34-27.49l31.21-31.21A106.45,106.45,0,0,1,256,362.67ZM2.19,265.42a21.33,21.33,0,0,1,0-18.83C51.15,147.11,148.4,85.33,256,85.33a277,277,0,0,1,70.4,9.22l-55.88,55.88A105.9,105.9,0,0,0,150.44,270.52L67.88,353.08A295.2,295.2,0,0,1,2.19,265.42Z"/>
                                </svg>
                            </span>
                        </button>
                    </div>

                    <div class="row registerButon66" style="padding-top: 1rem; padding-bottom:1rem;">
                        <div class="col-lg-8 col-md-12">
                            @if (Laravel\Jetstream\Jetstream::hasTermsAndPrivacyPolicyFeature())
                                <div class="mb-3">
                                    <div class="custom-control custom-checkbox d-flex">
                                        <x-jet-checkbox style="margin-right: 7px;" id="terms" name="terms" required/>
                                        <label class="custom-control-label label-terms" for="terms">
                                            {!! __('I agree to the :terms_of_service and :privacy_policy', [
                                                'terms_of_service' => '<a target="_blank" href="'.route('terms.show').'">'.__('Terms of Service').'</a>',
                                                'privacy_policy' => '<a target="_blank" href="'.route('policy.show').'">'.__('Privacy Policy').'</a>',
                                            ]) !!}
                                        </label>
                                    </div>
                                </div>
                            @endif
                        </div>

                        <div class="col-lg-4 col-md-12 botonRegistrarse">
                            <div class="justify-content-center d-flex">
                                <button class="darksoul-hover-fill-button" type="submit">
                                    <div class="color-fill"></div>
                                    <p>Registrarse</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>

                <span class="loginwith text-center w-100 d-block">O conectarse con</span>
                <div class=" justify-content-around d-flex p-2">
                     <button class="btn-165">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 262">
                            <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                            <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                            <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                            <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                        </svg>
                        <span>Registrase con Google</span>
                    </button>
                    {{-- <a class="aLogin" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                        </svg>
                    </a>
                    <a class="aLogin" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="M44.5 20H24v8.4h11.8C34.4 33.9 30 38 24 38c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.9 0 5.6 1 7.7 2.6l5.9-5.9C33.5 7.2 28.1 5 24 5 12.4 5 3 14.4 3 26s9.4 21 21 21c10.4 0 19.4-7.5 21-17.4V20h-0.5z"></path>
                        </svg>
                    </a>
                    <a class="aLogin" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                        </svg>
                    </a> --}}
                </div>
                {{-- <hr class=" mt-1 ms-3" style="margin-right: 1rem!important"> --}}
                <div class="noRegistrado">
                    <p style=" margin-bottom:5px;text-align:center">¿Ya estas registrado?</p>
                    <div class=" justify-content-center d-flex">
                        {{-- <form action="{{ route('login') }}" method="GET"> --}}
                            <button id="insert_login" type="submit"  class="darksoul-hover-fill-button" type="button" onclick="change_view_lr('login')"><div class="color-fill"></div><p>Login</p>
                            </button>
                        {{-- </form> --}}
                    </div>
                </div>

                 <script>
                    function togglePassword(inputId, buttonElement) {
                        const input = document.getElementById(inputId);

                        const eyeOpen = buttonElement.querySelector('.eye-open');
                        const eyeClosed = buttonElement.querySelector('.eye-closed');

                        if (input.type === "password") {
                            input.type = "text";
                            eyeOpen.classList.remove('d-none');
                            eyeClosed.classList.add('d-none');
                        } else {
                            input.type = "password";
                            eyeOpen.classList.add('d-none');
                            eyeClosed.classList.remove('d-none');
                        }
                    }
                </script>



            </div>
        </div>

    </div>

</x-guest-layout>
